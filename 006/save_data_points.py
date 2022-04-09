import json

def save_datapoints(points, filename):
  window_size = 180

  arr = []

  for i in range(len(points) - window_size + 1):
    window = list(points[i: i + window_size])
    arr.append(window)

  with open(f'data/running-window/{filename}.json', 'w+') as dataOutFile:
    dataOutFile.write(json.dumps(arr, indent=2))
    dataOutFile.close()

  print('Datapoints saved to file')
