import json
import os
import numpy as np
import matplotlib.pyplot as plt

from get_fft import get_fft

def get_running_window_samples():
  files = os.listdir('./raw_data/running-window')

  data = []
  for file in files:
    data.extend(json.load(open(f'./raw_data/running-window/{file}')))
    print(f'File {file} appended. Length: {len(data)}')

  return np.array([sample + get_fft(np.array(sample)) for sample in data])
