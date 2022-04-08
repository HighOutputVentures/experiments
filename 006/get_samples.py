import json
import numpy
import os
import matplotlib.pyplot as plt

from env_vars import RESOLUTION
from fetch_logs import fetch_logs
from get_fft import get_fft

def load_json(filename):
  data = json.load(open(f'data/response_times/{filename}'))
  return data['aggregations']['window']['buckets']

def has_complete_dimensions(item):
  return len(item['intervals']['buckets']) == RESOLUTION

def generate_points(sample):
  points = [
    m['point']['values']['95.0'] or 0
    for m in sample['intervals']['buckets']
  ]
  label = 1.0 if len(list(filter(lambda x: x > 5000, points))) < 10 else 0.0
  fft = get_fft(numpy.array(points))
  return points + fft + [label]

def get_samples():
  files = os.listdir('data/response_times/')
  raw = []

  for file in files:
    raw += load_json(file)

  valid_samples = list(filter(has_complete_dimensions, raw))

  print(f'no. of data: {len(valid_samples)}')

  return numpy.array([generate_points(n) for n in valid_samples])
