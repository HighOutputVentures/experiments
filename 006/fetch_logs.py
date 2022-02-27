import requests
from requests.auth import HTTPBasicAuth
from decouple import config

ELASTICSEARCH_URI = config('ELASTICSEARCH_URI')
ELASTICSEARCH_USERNAME = config('ELASTICSEARCH_USERNAME')
ELASTICSEARCH_PASSWORD = config('ELASTICSEARCH_PASSWORD')

query = {
    'size': 0,
    'query': {
        'bool': {
            'must': [
                { 'match': { 'json.tags': 'client, transaction' } },
                { 'exists': { 'field': 'json.message.responseTime' } }
            ]
        }
    },
    'aggs': {
        'window': {
            'date_histogram': {
                'field': '@timestamp',
                'fixed_interval': '10m'
            },
            'aggs': {
                'intervals': {
                    'date_histogram': {
                        'field': '@timestamp',
                        'fixed_interval': '5s'
                    },
                    'aggs': {
                        'point': {
                            'percentiles': {
                                'field': 'json.message.responseTime',
                                'percents': [ 95 ]
                            }
                        }
                    }
                }
            }
        }
    }
}

def fetch_logs():
    r = requests.post(
        url=ELASTICSEARCH_URI,
        json=query,
        auth=HTTPBasicAuth(ELASTICSEARCH_USERNAME, ELASTICSEARCH_PASSWORD)
    )

    return r.json()
