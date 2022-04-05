import matplotlib.pyplot as plt
import numpy as np

def get_fft(sample):
  sample -= sample.mean()
  hamm_weight = np.hamming(len(sample))
  sample_multiplied_hamm = sample * hamm_weight

  fft = np.fft.rfft(sample_multiplied_hamm)
  return np.ndarray.tolist(np.abs(fft))
