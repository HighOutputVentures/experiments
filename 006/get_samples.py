import json

import numpy

from search_logs import search_logs


def complete_dimension(item):
    return len(item['intervals']['buckets']) == 120

def generate_points(sample):
    points = [m['point']['values']['95.0'] or 300 for m in sample['intervals']['buckets']]
    label = 1.0 if max(points) < 10000 else 0.0
    return points + [label]

def get_samples(from_local=True):
    raw = json.load(open('data/raw.json')) if from_local else search_logs()
    valid_samples = list(filter(complete_dimension, raw['aggregations']['window']['buckets']))

    return numpy.array([generate_points(n) for n in valid_samples])
