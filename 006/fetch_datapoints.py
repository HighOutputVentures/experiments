import requests
import numpy as np

from requests.auth import HTTPBasicAuth
from decouple import config
from get_elastic_query_body import get_elastic_query_body
from save_data_points import save_datapoints

ELASTICSEARCH_URI = config('ELASTICSEARCH_URI')
ELASTICSEARCH_USERNAME = config('ELASTICSEARCH_USERNAME')
ELASTICSEARCH_PASSWORD = config('ELASTICSEARCH_PASSWORD')

def extract_points(points):
  for item in points:
    yield round(item['point']['values']['95.0'] or 0, 2)

def fetch_datapoints(gte, lte):
  query = get_elastic_query_body(gte=gte, lte=lte)
  print(query)

  print('Fetching logs from Elastic...')
  data = requests.post(
    url=ELASTICSEARCH_URI,
    json=query,
    auth=HTTPBasicAuth(ELASTICSEARCH_USERNAME, ELASTICSEARCH_PASSWORD)
  )

  return np.array(list(extract_points(data.json()['aggregations']['window']['buckets'])))

points = fetch_datapoints('2022-04-20T00:00:00.000Z', '2022-04-20T12:00:00.000Z')
print(points)
