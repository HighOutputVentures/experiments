import json
import matplotlib.pyplot as plt
import numpy as np
import os

file =  open('data/running-window/source.csv', 'r')
points = json.load(file)
file.close()
y = np.array(points).astype(float)[0:1000]

window_size = 180

for i in range(len(y) - window_size + 1):
  window = y[i: i + window_size]
  plt.plot(window)

  if not os.path.exists('figures/sliding'):
    os.makedirs('figures/sliding')

  plt.savefig(f'figures/sliding/{i+1}.png')
  plt.clf()
