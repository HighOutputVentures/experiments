import matplotlib.pyplot as plt
import numpy as np
from scipy.signal import detrend

def get_fft(sample, plot=False):
  if plot:
    plt.title('Original sample')
    plt.plot(sample)
    plt.show()

  sample = detrend(data=sample, type='constant')

  if plot:
    plt.title('Sample after mean is removed')
    plt.plot(sample)
    plt.show()

  hamm_weight = np.hamming(len(sample))
  sample_multiplied_hamm = sample * hamm_weight

  if plot:
    plt.title('Sample after applying hamming filter')
    plt.plot(sample_multiplied_hamm)
    plt.show()

  fft = np.fft.rfft(sample_multiplied_hamm)
  y = np.ndarray.tolist(np.abs(fft))

  if plot:
    plt.title('Sample converted to FFT')
    plt.plot(y)
    plt.show()

  return y
