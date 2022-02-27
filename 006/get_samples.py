import json

from search_logs import search_logs


def validate_sample(sample):
    return len(sample) == 120

def get_samples(from_local=True):
    raw = json.load(open('data/raw.json')) if from_local else search_logs()
    samples = [
        [m['point']['values']['95.0'] or 300 for m in n['intervals']['buckets']]
        for n in raw['aggregations']['window']['buckets']
    ]

    return list(filter(validate_sample, samples))
