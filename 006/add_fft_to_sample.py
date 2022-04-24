import matplotlib.pyplot as plt
import numpy as np
from scipy.signal import detrend

def add_fft_to_sample(sample):
  sample_detrended = detrend(data=np.array(sample), type='constant')
  hamm_weight = np.hamming(len(sample_detrended))
  sample_multiplied_hamm = sample_detrended * hamm_weight

  fft = np.fft.rfft(sample_multiplied_hamm)
  y = np.ndarray.tolist(np.abs(fft))

  sample_with_fft = sample + y

  return sample_with_fft
