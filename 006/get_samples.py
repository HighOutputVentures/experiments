from audioop import getsample
import json

f = open('data/raw.json')

raw = json.load(f)


def validate_sample(sample):
  return len(sample) == 120


def get_samples():
    samples = [
        [m['point']['values']['95.0'] or 300 for m in n['intervals']['buckets']]
        for n in raw['aggregations']['window']['buckets']
    ]

    return list(filter(validate_sample, samples))
