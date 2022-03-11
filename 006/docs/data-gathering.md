# Data Gathering

## Elasticsearch Query

Here's the query that was used to retrieve the logs:
```json
{
    "size": 0,
    "query": {
        "bool": {
            "must": [
                { "match": { "json.tags": "client, transaction" } },
                { "exists": { "field": "json.message.responseTime" } },
                {
                    "range": {
                        "@timestamp": {
                            "gte": "2022-03-10T12:00:00.000Z",
                            "lt": "2022-03-11T00:00:00.000Z"
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
                "fixed_interval": "3m"
            },
            "aggs": {
                "intervals": {
                    "date_histogram": {
                        "field": "@timestamp",
                        "fixed_interval": "1s"
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

Sample response can be found [here](../data/response_times/).

## Breakdown of Query

- Retrieved only the logs where `json.tags` matches with `'client, transaction'`. These are internal client requests within the Wallet environment.
- `@timestamp` range was also supplied to retrieve logs only in the span of 12 hours. This is the maximum number of buckets that can be retrieved with 1-second resolution per 3-minute aggregation.
- For the aggregations:
    1. Logs are grouped for every 3-minute `fixed_interval`.
    2. For each of those 3-minute interval group, a sub-aggregation is added to group logs for every 1-second `fixed_interval` and computed for the 95th percentile of responseTime for every 1-second interval.
