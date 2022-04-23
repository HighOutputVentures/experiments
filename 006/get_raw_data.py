import requests

from requests.auth import HTTPBasicAuth
from decouple import config
from get_elastic_query_body import get_elastic_query_body

ELASTICSEARCH_URI = config('ELASTICSEARCH_URI')
ELASTICSEARCH_USERNAME = config('ELASTICSEARCH_USERNAME')
ELASTICSEARCH_PASSWORD = config('ELASTICSEARCH_PASSWORD')

def get_raw_data(start, end):
  query = get_elastic_query_body(gte=start, lte=end)
  print(query)

  print('Fetching logs from Elastic...')
  return requests.post(
    url=ELASTICSEARCH_URI,
    json=query,
    auth=HTTPBasicAuth(ELASTICSEARCH_USERNAME, ELASTICSEARCH_PASSWORD)
  )
