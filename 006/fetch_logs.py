import json
import requests
import moment

from requests.auth import HTTPBasicAuth
from decouple import config

ELASTICSEARCH_URI = config('ELASTICSEARCH_URI')
ELASTICSEARCH_USERNAME = config('ELASTICSEARCH_USERNAME')
ELASTICSEARCH_PASSWORD = config('ELASTICSEARCH_PASSWORD')

def get_query_body(gte, lt):
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
                                "lt": lt
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



def fetch_logs(startDateString, endDateString):
  gte = startDateString
  filename = f"{startDateString.replace(':', '-')} to {endDateString.replace(':', '-')}"

  while (gte != endDateString):
    print(f'Retrieving data for {gte}')
    lte = moment.date(gte).add(minute=3).isoformat().replace('+00:00', '.000Z')
    r = requests.post(
      url=ELASTICSEARCH_URI,
      json=get_query_body(gte, lte),
      auth=HTTPBasicAuth(ELASTICSEARCH_USERNAME, ELASTICSEARCH_PASSWORD)
    )

    points = [str(round(item['point']['values']['95.0'] or 0, 2)) for item in r.json()['aggregations']['window']['buckets']]

    dataOutFile = open(f'data/running-window/{filename}.csv', 'a+')
    dataOutFile.write(','.join(points) + "\n")
    dataOutFile.close()

    lastDateFile = open(f'data/{filename}.txt', 'w')
    lastDateFile.write(gte)
    lastDateFile.close()

    gte = moment.date(gte).add(second=1).isoformat().replace('+00:00', '.000Z')
