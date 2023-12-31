# COS597A Project: Wearable Health Condition Detection with Vector Database

## Project Overview

The project's objective is to investigate the feasibility of employing a Vector Database for health surveillance. We have conducted thorough testing across various datasets and developed a health condition monitoring system anchored by the Vector Database. Utilizing Pinecone for our database needs, we have also created a web application capable of analyzing and diagnosing ECG data derived from the Apple Watch, showcasing the potential for advanced health monitoring solutions.

### Presentation

- Slides: [link](./COS597A_Project_Final.pdf)
- Video Demo Link: [Google Drive](https://drive.google.com/file/d/1_WHb4aabwujUbzh40ARQyKZ5RU7dtKKe/view?usp=drive_link)

## Table of Contents

- [COS597A Project: Wearable Health Condition Detection with Vector Database](#cos597a-project-wearable-health-condition-detection-with-vector-database)
  - [Project Overview](#project-overview)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Datasets](#datasets)
    - [MIT-BIH](#mit-bih)
    - [PTB](#ptb)
    - [The PhysioNet/Computing in Cardiology Challenge 2017](#the-physionetcomputing-in-cardiology-challenge-2017)
  - [Contact](#contact)

## Installation

The project contains two components, 1. ECG dataset testing and 2. Health monitoring web applications

1. ECG dataset requires the following dependencies: `python` with `jupyter` notebook

```bash
pip install -r requirements.txt
```

- Setup api key for Pinecone by creating `datasets/pinecone.config.json` file

  ```json
  {
    "PINECONE_API_KEY": "xxxxxxxxxx",
    "PINECONE_ENVIRONMENT": "us-east4-gcp"
  }
  ```

1. Health monitoring web application: also requires `nodejs` for website

```bash
(cd backend && yarn install)
(cd wearable-health-vector-app && yarn install)
```

- Create `wearable-health-vector-app/.env.local` to connect frontend to the backend api

  ```log
  ### Backend location
  NEXT_PUBLIC_UPLOAD_URL=http://localhost:3011/upload
  ```

## Usage

1. Check notebooks in datasets for detail

2. Start backend

   ```bash
   cd backend
   mkdir -p uploads results
   nodemon app.js
   ```

3. Start frontend

    ```bash
    cd wearable-health-vector-app
    npm run dev
    ```

## Datasets

### MIT-BIH

The MIT-BIH Arrhythmia Dataset preprocessed and segmented, with each segment corresponding to a heartbeat

- [Our notebook](./datasets/MIT-BIH.ipynb)
- Data Source: [Kaggle Dataset](https://www.kaggle.com/datasets/shayanfazeli/heartbeat/data)
- Classes: {"N": 0, "S": 1, "V": 2, "F": 3, "Q": 4}

### PTB

The PTB Diagnostic ECG Database preprocessed and segmented, with each segment corresponding to a heartbeat

- [Our notebook](./datasets/PTB.ipynb)
- Data Source: [Kaggle Dataset](https://www.kaggle.com/datasets/shayanfazeli/heartbeat/data)
- Number of Categories: 2

### The PhysioNet/Computing in Cardiology Challenge 2017

AF Classification from a Short Single Lead ECG Recording

- [Our notebook](./datasets/af-challenge2017.ipynb)
- Data Source: [PhysioNet](https://physionet.org/content/challenge-2017/1.0.0/)
- Classes: {"Normal": 0, "AF": 1, "Other rhythm": 2, "Noisy": 3}

## Contact

Malinda Huang: <linhui.huang@princeton.edu>  
Yucan Wu: <yucan.wu@princeton.edu>
