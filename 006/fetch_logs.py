import json
import requests
import moment

from requests.auth import HTTPBasicAuth
from decouple import config

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

def fetch_logs(dateString):
  lte = moment.date(dateString).add(minute=3).isoformat().replace('+00:00', '.000Z')
  r = requests.post(
    url=ELASTICSEARCH_URI,
    json=get_query_body(dateString, lte),
    auth=HTTPBasicAuth(ELASTICSEARCH_USERNAME, ELASTICSEARCH_PASSWORD)
  )

  print(dateString)

  with open(f'data/running_window/{moment.date(dateString).isoformat()}.json', 'w+') as outfile:
      json.dump(r.json(), outfile)

  fetch_logs(moment.date(dateString).add(second=1).isoformat().replace('+00:00', '.000Z'))

fetch_logs('2022-03-30T00:00:00.000Z')
