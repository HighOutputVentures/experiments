import requests

from requests.auth import HTTPBasicAuth
from decouple import config

ELASTICSEARCH_URI = config('ELASTICSEARCH_URI')
ELASTICSEARCH_USERNAME = config('ELASTICSEARCH_USERNAME')
ELASTICSEARCH_PASSWORD = config('ELASTICSEARCH_PASSWORD')

query = {
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
                            "gte": "2022-03-31T00:00:00.000Z",
                            "lte": "2022-03-31T00:03:00.000Z"
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


def fetch_logs():
  print('Fetching data.')
  r = requests.post(
    url=ELASTICSEARCH_URI,
    json=query,
    auth=HTTPBasicAuth(ELASTICSEARCH_USERNAME, ELASTICSEARCH_PASSWORD)
  )

  print('Data fetched.')
  return r.json()

while True:
  fetch_logs()
