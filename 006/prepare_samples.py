import numpy as np

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

def prepare_samples(start, end):
  raw_data = get_elastic_data(start=start, end=end)
  values = extract_values(raw_data)
  samples = get_sliding_data(values, 180)
  return samples;
