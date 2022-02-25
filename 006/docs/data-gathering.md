# Data Gathering

The goal is to get data samples of m-minute window of response times plotted into n-second intervals.

1. Retrieve all logs for response times.
2. Group the logs by m-minute.
3. For each m-minute group, group the logs by n-second interval.
4. For each n-second group, compute the 95th percentile response time.

All these steps can be performed using Elasticsearch query.

Elasticsearch Query
```json
{
    "size": 0,
    "query": {
        "bool": {
            "must": [
                { "match": { "json.tags": "client, transaction" } },
                { "exists": { "field": "json.message.responseTime" } }
            ]
        }
    },
    "aggs": {
        "window": {
            "date_histogram": {
                "field": "@timestamp",
                "fixed_interval": "10m"
            },
            "aggs": {
                "intervals": {
                    "date_histogram": {
                        "field": "@timestamp",
                        "fixed_interval": "5s"
                    },
                    "aggs": {
                        "point": {
                            "percentiles": {
                                "field": "json.message.responseTime",
                                "percents": [ 95 ]
                            }
                        }
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
    "took": 10294,
    "timed_out": false,
    "_shards": {
        "total": 165,
        "successful": 165,
        "skipped": 154,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 10000,
            "relation": "gte"
        },
        "max_score": null,
        "hits": []
    },
    "aggregations": {
        "window": {
            "buckets": [
                {
                    "key_as_string": "2022-02-23T04:10:00.000Z",
                    "key": 1645589400000,
                    "doc_count": 7033,
                    "intervals": {
                        "buckets": [
                            {
                                "key_as_string": "2022-02-23T04:10:00.000Z",
                                "key": 1645589400000,
                                "doc_count": 41,
                                "point": {
                                    "values": {
                                        "95.0": 76.84999999999994
                                    }
                                }
                            },
                            {
                                "key_as_string": "2022-02-23T04:10:05.000Z",
                                "key": 1645589405000,
                                "doc_count": 511,
                                "point": {
                                    "values": {
                                        "95.0": 186.95
                                    }
                                }
                            },
                            {
                                "key_as_string": "2022-02-23T04:10:10.000Z",
                                "key": 1645589410000,
                                "doc_count": 582,
                                "point": {
                                    "values": {
                                        "95.0": 104.0
                                    }
                                }
                            },
                            // ...
                        ]
                    }
                },
                // ...
            ]
        }
    }
}
```

For this experiment, I'll choose 10-minute window with 95th percentile of response times plotted in 5-second intervals. The main reason for this decision is that, since autoencoders are neural networks that reduce the data into low dimensional latent representation, we want our samples or inputs to have enough dimensionality.

With response times plotted in 5-second intervals in a 10-minute window, I can have 140 points. Having 120 points per data sample as input to an autoencoder is more reasonable compared to 5 points per data sample that I would get if I choose response times plotted in 60-second intervals in 5-minute window.
