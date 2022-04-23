import numpy as np

def extract_values(raw_data):
  return np.array([
    round(item['point']['values']['95.0'] or 0, 2)
    for item in
    raw_data.json()['aggregations']['window']['buckets']
  ])
