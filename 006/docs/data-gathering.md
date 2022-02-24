# Data Gathering

1. Retrieving logs from Elasticsearch

    Performed two level of aggregations. (1) Group logs by date using `date_histogram` and specifying the `fixed_interval` as `1m`. (2) For each group, compute the 95th percentile using `percentiles` aggregation.

    Elasticsearch Query Body
    ```json
    {
        "query": {
            "bool": {
                "must": [
                    { "match": { "json.tags": "client" } },
                    { "exists": { "field": "json.message.responseTime" } }
                ]
            }
        },
        "aggs": {
            "group_by_minute": {
                "date_histogram": {
                    "field": "@timestamp",
                    "fixed_interval": "1m"
                },
                "aggs": {
                    "percentiles_by_group": {
                        "percentiles": {
                            "field": "json.message.responseTime",
                            "percents": [ 95 ]
                        }
                    }
                }
            }
        }
    }
    ```

    Sample Response
    ```json
    {
        "took": 7215,
        "timed_out": false,
        "_shards": {
            "total": 164,
            "successful": 164,
            "skipped": 154,
            "failed": 0
        },
        "hits": {
          // ...
        },
        "aggregations": {
            "group_by_minute": {
                "buckets": [
                    {
                        "key_as_string": "2022-02-23T04:19:00.000Z",
                        "key": 1645589940000,
                        "doc_count": 7033,
                        "percentiles_by_group": {
                            "values": {
                                "95.0": 152.05384615384608
                            }
                        }
                    },
                    {
                        "key_as_string": "2022-02-23T04:20:00.000Z",
                        "key": 1645590000000,
                        "doc_count": 7511,
                        "percentiles_by_group": {
                            "values": {
                                "95.0": 176.9821428571428
                            }
                        }
                    },
                    {
                        "key_as_string": "2022-02-23T04:21:00.000Z",
                        "key": 1645590060000,
                        "doc_count": 5200,
                        "percentiles_by_group": {
                            "values": {
                                "95.0": 202.13636363636363
                            }
                        }
                    },
                    // ...
                ]
            }
        }
    }
    ```
