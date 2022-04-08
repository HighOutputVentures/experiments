import json
import matplotlib.pyplot as plt
import numpy as np

sourceFile =  open('data/running-window/source.json', 'r')
points = json.load(sourceFile)
sourceFile.close()
y = np.array(points).astype(float)[0:1000]

window_size = 180

arr = []
with open(f'data/running-window/data-points.json', 'r') as read_file:
  arr = json.load(read_file)
  read_file.close()

for i in range(len(y) - window_size + 1):
  window = list(y[i: i + window_size])
  arr.append(window)
  # plt.plot(window)

  # if not os.path.exists('figures/sliding'):
  #   os.makedirs('figures/sliding')

  # plt.savefig(f'figures/sliding/{i+1}.png')
  # plt.clf()

with open(f'data/running-window/data-points.json', 'w') as dataOutFile:
  dataOutFile.write(json.dumps(arr, indent=2))
  dataOutFile.close()
