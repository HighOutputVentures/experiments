import json
import requests
import moment

from requests.auth import HTTPBasicAuth
from decouple import config

from fetch_logs import get_query_body

ELASTICSEARCH_URI = config('ELASTICSEARCH_URI')
ELASTICSEARCH_USERNAME = config('ELASTICSEARCH_USERNAME')
ELASTICSEARCH_PASSWORD = config('ELASTICSEARCH_PASSWORD')

gte = '2022-04-02T12:00:00.000Z'
lt = '2022-04-03T00:00:00.000Z'

r = requests.post(
  url=ELASTICSEARCH_URI,
  json=get_query_body(gte, lt),
  auth=HTTPBasicAuth(ELASTICSEARCH_USERNAME, ELASTICSEARCH_PASSWORD)
)

points = [str(round(item['point']['values']['95.0'] or 0, 2)) for item in r.json()['aggregations']['window']['buckets']]

arr = []
with open(f'data/running-window/source.csv', 'r') as read_file:
  arr = json.load(read_file)
  read_file.close()

arr.extend(points)
print(len(arr))

with open(f'data/running-window/source.csv', 'w') as dataOutFile:
  dataOutFile.write(json.dumps(arr, indent=2))
  dataOutFile.close()
