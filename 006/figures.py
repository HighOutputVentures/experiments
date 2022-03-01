import matplotlib.pyplot as plt
import numpy as np

from get_samples import get_samples

samples = get_samples()

labels = (samples[:, -1]).astype(bool)
data = samples[:, 0:-1]


normal_data = data[labels]
anomalous_data = data[~labels]

for idx, sample in enumerate(normal_data):
  plt.grid()
  plt.plot(np.arange(120), sample)
  plt.ylim(0, 30000)
  plt.savefig(f'figures/normal/{idx}.png')
  plt.clf()
