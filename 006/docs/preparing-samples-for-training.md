# Preparing Samples for Training

Code for preparing training data can be found [here](../train.py).

1. Extract datapoints and labels from the samples.
    ```python
    labels = samples[:, -1]
    data_points = samples[:, 0:-1]
    ```

2. Split data for training and testing. Labels will be used later to segragate good data from anomalous data.
    ```python
    raw_train_data, raw_test_data, raw_train_labels, raw_test_labels = train_test_split(
      datapoints, labels, test_size=0.2, random_state=21
    )
    ```

3. Normalize datapoints to be between [0, 1] and then cast data points to `tf.float32`.
    ```python
    min_val = tf.reduce_min(raw_train_data)
    max_val = tf.reduce_max(raw_train_data)

    normalized_raw_train_data = (raw_train_data - min_val) / (max_val - min_val)
    normalized_raw_test_data = (raw_test_data - min_val) / (max_val - min_val)

    train_data = tf.cast(normalized_raw_train_data, tf.float32)
    test_data = tf.cast(normalized_raw_test_data, tf.float32)
    ```

4. Get only the good data for training by filtering out negative labels from `train_data`.
    ```python
    train_labels = raw_train_labels.astype(bool)

    good_train_data = train_data[train_labels]
    ```
