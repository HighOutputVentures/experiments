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
