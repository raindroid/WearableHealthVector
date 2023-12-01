# yourscript.py
from collections import defaultdict
import sys
import numpy as np
import pandas as pd
import os
import pinecone
import json
from pathlib import Path
import zipfile
from biosppy.signals import ecg
from scipy.signal import resample


root_folder = Path(".")
assert root_folder.exists(), "The folder does not exist"
try:
    pinecone_config = json.load(open(root_folder / '../datasets/pinecone.config.json'))
except FileNotFoundError as e:
    print("Pinecone.json not found. Please copy ./pinecone-template.config.json and fill in the values.")
    raise e

# get api key from app.pinecone.io
PINECONE_API_KEY = os.environ.get(
    'PINECONE_API_KEY') or pinecone_config['PINECONE_API_KEY']
# find your environment next to the api key in pinecone console
PINECONE_ENV = os.environ.get(
    'PINECONE_ENVIRONMENT') or pinecone_config['PINECONE_ENVIRONMENT']

pinecone.init(
    api_key=PINECONE_API_KEY,
    environment=PINECONE_ENV
)

def get_pinecone_index(index_name):

    # now connect to the index
    index = pinecone.GRPCIndex(index_name)
    return index

def unzip_file(file_path):
    if not zipfile.is_zipfile(file_path):
        return False, "The file is not a zip file"
    folder_path = Path(str(file_path)[:-4])
    if folder_path.exists():
        return True, folder_path
    with zipfile.ZipFile(file_path, 'r') as zip_ref:
        zip_ref.extractall(str(file_path)[:-4])
    return True, folder_path


def parse_ecg(folder_path):
    
    if not (folder_path / "apple_health_export/electrocardiograms").exists():
        return False, "The ECG record folder does not exist"

    ecg_folder = folder_path / "apple_health_export/electrocardiograms"
    ecg_files = list(ecg_folder.glob('*.csv'))

    ecg_files.sort(key=lambda x: x.name, reverse=True)

    # Selecting the first three files from the sorted list
    top_three_ecg_files = ecg_files[:3]

    profile = None
    test_x = []
    names = []
    for file in top_three_ecg_files:
        last_ecg = pd.read_csv(file, header=None)
        
        test_x.append(last_ecg[10:].to_numpy().astype(np.float32)[:,0])
        names.append(file.name[:-4])
        if profile is None:
            profile = {
                "name": last_ecg.iloc[0][1],
                "birthday": last_ecg.iloc[1][1],
                "date": last_ecg.iloc[2][1],
                "class": last_ecg.iloc[3][1],
                "symptoms": last_ecg.iloc[4][1],
                "version": last_ecg.iloc[5][1],
                "device": last_ecg.iloc[6][1],
                "sample_rate": int(last_ecg.iloc[7][1].split(" ")[0]),
                "lead": last_ecg.iloc[8][1],
                "unit": last_ecg.iloc[9][1],
            }
            # print(profile)
    return True, test_x, profile, names

def split_beat(signal, profile, input_fs=512, output_fs=125, pad=60, padding_size=187):
    out = ecg.ecg(signal=signal, sampling_rate=profile['sample_rate'], show=False)
    rpeaks = np.zeros_like(signal, dtype='float')
    rpeaks[out['rpeaks']] = 1.0

    # Split into individual heartbeats. For each heartbeat
    # record, append classification (normal/abnormal).
    beats = np.split(signal, out['rpeaks'])
    final_beats = []
    for idx, idxval in enumerate(out['rpeaks']):
        firstround = idx == 0
        lastround = idx == len(beats) - 1

        # Skip first and last beat.
        if (firstround or lastround):
            continue

        # Append some extra readings from next beat.
        beats[idx] = np.append(beats[idx], beats[idx+1][:pad])

        # Normalize the readings to a 0-1 range for ML purposes.
        beats[idx] = (beats[idx] - beats[idx].min()) / beats[idx].ptp()

        # Resample from 360Hz to 125Hz
        newsize = int((beats[idx].size * output_fs / input_fs) + 0.5)
        beats[idx] = resample(beats[idx], newsize)

        # Skipping records that are too long.
        if (beats[idx].size > 187 + pad):
            continue
        elif (beats[idx].size > 187):
            beats[idx] = beats[idx][:187]

        # Pad with zeroes.
        zerocount = padding_size - beats[idx].size
        beats[idx] = np.pad(beats[idx], (0, zerocount), 'constant', constant_values=(0.0, 0.0))
        final_beats.append(beats[idx])
        
    return np.array(final_beats)

def parse_beats(test_x, profile):
    beats = []
    for test_1 in test_x:
        beats.append(split_beat(test_1, profile, pad=58))
    return True, beats

def query_pinecone(beats, index):
    # query pinecone
    query_results = []
    top_1 = []
    top_5 = []
    for beat in beats:
        query_results.append([])
        top_1.append([])
        top_5.append([])
        for beat_1 in beat:
            res = index.query(
                vector=beat_1,
                top_k=5,
                include_metadata=True,
                include_values=True,
            )
            formated_res = []
            top_1[-1].append(res['matches'][0].metadata['label'])
            counter = defaultdict(int)
            for i in res['matches']:
                temp = {}
                temp['label'] = i.metadata['label']
                temp['values'] = i.values
                temp['score'] = i.score
                temp['id'] = i.id
                formated_res.append(temp)
                counter[i.metadata['label']] += 1
            top_5[-1].append(max(counter, key=counter.get))
                
            query_results[-1].append(formated_res)
    return query_results, top_1, top_5


def process_file(file_path):
    response = {"status": "success", "file_path": str(file_path)}
    
    # get pinecone index
    try:
        index_name = 'mit-bih-c'
        index = get_pinecone_index(index_name)
    except Exception as e:
        response["status"] = "Error: [Pinecone] " + str(e)
        return response
    
    # unzip file
    status, res = unzip_file(file_path)
    if not status:
        response["status"] = "Error: [Unzip] " + str(res)
        return response
    response["folder_path"] = str(res)
    
    # load raw ecg data
    status, test_x, profile, names = parse_ecg(res)
    if not status:
        response["status"] = "Error: [Load]" + str(res)
        return response
    response["ecg_raw"] = [tx.tolist() for tx in test_x]
    response["ecg_names"] = names
    
    # parse beats
    status, beats = parse_beats(test_x, profile)
    if not status:
        response["status"] = "Error: [Parse]" + str(res)
        return response
    response["ecg_beats"] = [tx.tolist() for tx in beats]
    
    # query beats
    try:
        query_results, top_1, top_5 = query_pinecone(beats, index)
    except Exception as e:
        response["status"] = "Error: [Query] " + str(e)
        return response
    
    response["results"] = query_results
    response["top_1"] = top_1
    response["top_5"] = top_5
    
    # Process the file and return results
    return response


if __name__ == "__main__":
    file_path = Path(sys.argv[1])
    result = process_file(file_path)
    
    # dump results
    result_path = (Path("results") / file_path.name[:-4])
    result_path.mkdir(parents=True, exist_ok=True)
    json.dump(result, open(result_path / "result.json", "w"))
    
    res_json = json.dumps(result)
    # The output will be sent back to the Node.js app
    print(res_json)  
