import requests
import numpy as np

from requests.auth import HTTPBasicAuth
from decouple import config
from save_data_points import save_datapoints

ELASTICSEARCH_URI = config('ELASTICSEARCH_URI')
ELASTICSEARCH_USERNAME = config('ELASTICSEARCH_USERNAME')
ELASTICSEARCH_PASSWORD = config('ELASTICSEARCH_PASSWORD')

def get_query_body(gte, lte):
  return {
    "size": 0,
    "query": {
      "bool": {
        "must": [
          {
            "match": {
              "json.tags": "client, transaction"
            }
          },
          {
            "exists": {
              "field": "json.message.responseTime"
            }
          },
          {
            "range": {
              "@timestamp": {
                "gte": gte,
                "lte": lte
              }
            }
          }
        ]
      }
    },
    "aggs": {
      "window": {
        "date_histogram": {
          "field": "@timestamp",
          "fixed_interval": "1s"
        },
        "aggs": {
          "point": {
            "percentiles": {
              "field": "json.message.responseTime",
              "percents": [
                95
              ]
            }
          }
        }
      }
    }
  }

gteDayAndHour = '07T12'
ltDayAndHour = '08T00'

query = get_query_body(f'2022-04-{gteDayAndHour}:00:00.000Z', f'2022-04-{ltDayAndHour}:00:00.000Z')

print('Sending request to Elastic...')
r = requests.post(
  url=ELASTICSEARCH_URI,
  json=query,
  auth=HTTPBasicAuth(ELASTICSEARCH_USERNAME, ELASTICSEARCH_PASSWORD)
)

points = [str(round(item['point']['values']['95.0'] or 0, 2)) for item in r.json()['aggregations']['window']['buckets']]

print(f'Retrieved {len(points)} from Elastic...')

save_datapoints(np.array(points).astype(float), f'2022-04-{gteDayAndHour}-{ltDayAndHour}')
