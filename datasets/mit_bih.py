import numpy as np
import pandas as pd
import torch
import torchvision
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
from torch.utils.data import Dataset, DataLoader
from PIL import Image
import time
from tqdm import tqdm
from pathlib import Path
import matplotlib.pyplot as plt

# root_folder = Path(input("Enter the folder path: (leave blank for default)")) # leave blank for default
root_folder = Path(".")
assert root_folder.exists(), "The folder does not exist"
assert (root_folder / "data/mitbih/mitbih_test.csv").exists(), "The folder does not exist"

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


## Load the data from apple health export
assert (root_folder / "data/apple_health_export/electrocardiograms").exists(), "The ECG record folder does not exist"

ecg_folder = root_folder / "data/apple_health_export/electrocardiograms"
ecg_files = list(ecg_folder.glob('*.csv'))

print(f"Found {len(ecg_files)} ECG records")

def parse_ecg(ecg_file):
    last_ecg = pd.read_csv(ecg_file, header=None)
    test_x = last_ecg[10:].to_numpy().astype(np.float32)[:,0]
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
    print(profile)
    return test_x, profile

test_apple, profile = parse_ecg(sorted(ecg_files)[-1])


from biosppy.signals import ecg

out = ecg.ecg(signal=test_apple, sampling_rate=profile['sample_rate'], show=True)