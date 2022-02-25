import json

f = open('data/raw.json')

raw = json.load(f)

print(len(raw['aggregations']['window']['buckets']))


def parse_window(item):
  return [n['point']['values']['95.0'] for n in item['intervals']['buckets']]


samples = [parse_window(n) for n in raw['aggregations']['window']['buckets']]
