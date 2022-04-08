import matplotlib.pyplot as plt
import numpy as np

def get_fft(sample):
  # sample -= sample.mean()

  plt.plot(sample)
  plt.show()
  hamm_weight = np.hamming(len(sample))
  sample_multiplied_hamm = sample * hamm_weight

  plt.plot(sample_multiplied_hamm)
  plt.show()

  fft = np.fft.rfft(sample_multiplied_hamm)
  return np.ndarray.tolist(np.abs(fft))
