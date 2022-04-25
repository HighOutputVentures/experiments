import requests

from requests.auth import HTTPBasicAuth
from decouple import config

ELASTICSEARCH_URI = config('ELASTICSEARCH_URI')
ELASTICSEARCH_USERNAME = config('ELASTICSEARCH_USERNAME')
ELASTICSEARCH_PASSWORD = config('ELASTICSEARCH_PASSWORD')

def get_elastic_query_body(gte, lte):
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


def get_elastic_data(start, end):
  query = get_elastic_query_body(gte=start, lte=end)
  print(query)

  print('Fetching logs from Elastic...')
  return requests.post(
    url=ELASTICSEARCH_URI,
    json=query,
    auth=HTTPBasicAuth(ELASTICSEARCH_USERNAME, ELASTICSEARCH_PASSWORD)
  )
