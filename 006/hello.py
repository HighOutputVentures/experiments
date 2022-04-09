import json
import matplotlib.pyplot as plt

file = open('data/running-window/2022-04-05T00-05T12.json', 'r')
data = json.load(file)

for item in data:
  plt.plot(item)
  plt.show()
