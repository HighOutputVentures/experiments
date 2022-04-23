# Data Gathering

1. Logs for internal API response times are gathered from Elastic search.
2. For every second, the 95th percentile of all response times (at that period of 1 second) will be taken as our raw datapoints.

    The query body sent to Elastic is generated from here: [`get_query_body(gte, lte)`](../get_elastic_query_body.py)

    With the limitations of the Elastic instance used, we are only able to get response times logs of 1 second-interval for a period of 12 hours. For that reason, we will be splitting our queries for every 12 hours.

    Here's an example of data (truncated) returned by Elastic:
    ```json
    {
        "took": 1383,
        "timed_out": false,
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
                        "key_as_string": "2022-04-20T00:00:01.000Z",
                        "key": 1650412801000,
                        "doc_count": 2,
                        "point": {
                            "values": {
                                "95.0": 198.0
                            }
                        }
                    },
                    {
                        "key_as_string": "2022-04-20T00:00:02.000Z",
                        "key": 1650412802000,
                        "doc_count": 0,
                        "point": {
                            "values": {
                                "95.0": null
                            }
                        }
                    },
                    {
                        "key_as_string": "2022-04-20T00:00:03.000Z",
                        "key": 1650412803000,
                        "doc_count": 4,
                        "point": {
                            "values": {
                                "95.0": 1856.0
                            }
                        }
                    }
                ]
            }
        }
    }
    ```

    These logs are then saved in different files.
3. To achieve the goal of overfitting the model with good data, datapoints are queried from Elastic with given timestamps corresponding to those days that have no reports of system unresponsiveness and that the system is considered to be operating normally.
