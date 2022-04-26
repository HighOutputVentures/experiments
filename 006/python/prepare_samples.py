import numpy as np
import random

from get_elastic_data import get_elastic_data

def get_sliding_data(total_points, window_size):
  datapoints = []
  for i in range(len(total_points) - window_size + 1):
    window = list(total_points[i: i + window_size])
    datapoints.append(window)

  return datapoints;

def extract_values(raw_data):
  return np.array([
    round(item['point']['values']['95.0'] or 0, 2)
    for item in
    raw_data.json()['aggregations']['window']['buckets']
  ])

def prepare_samples(start, end, distort=False, shuffle=False):
  raw_data = get_elastic_data(start=start, end=end)
  values = extract_values(raw_data)

  if distort:
    random_index = random.randint(0, len(values))
    for n in range(0, 20, 2):
      values[random_index + n] += random.randint(0, 10000)

  samples = get_sliding_data(values, 180)

  if shuffle:
    np.random.shuffle(samples)

  return samples;
