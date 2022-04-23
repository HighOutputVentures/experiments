import matplotlib.pyplot as plt
import numpy as np
import os

from env_vars import RESOLUTION
from prepare_samples import get_samples

samples = get_samples()

labels = (samples[:, -1]).astype(bool)
data = samples[:, 0:-1]


normal_data = data[labels]
anomalous_data = data[~labels]

print(f'no. of normal data: {len(normal_data)}')
print(f'no. of anomalous_data: {len(anomalous_data)}')

if not os.path.exists('figures/normal'):
  os.makedirs('figures/normal')

if not os.path.exists('figures/anomalous'):
  os.makedirs('figures/anomalous')

for idx, sample in enumerate(normal_data[0:30]):
  plt.grid()
  plt.plot(np.arange(RESOLUTION), sample)
  # plt.ylim(0, 30000)
  plt.savefig(f'figures/normal/{idx+1}.png')
  plt.clf()

for idx, sample in enumerate(anomalous_data[0:30]):
  plt.grid()
  plt.plot(np.arange(RESOLUTION))
  # plt.ylim(0, 30000)
  plt.savefig(f'figures/anomalous/{idx+1}.png')
  plt.clf()
