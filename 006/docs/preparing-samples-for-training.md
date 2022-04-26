# Preparing Samples for Training



The code for preparing samples can be found here: [`prepare_samples.py`](../python/prepare_samples.py)



2.

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
