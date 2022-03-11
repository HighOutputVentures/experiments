# Validating The Model

Code for validating the model can also be found [here](../train.py).

1. Determine the error threshold that will allow us to decide whether a given sample (samples that the model hasn't encountered before) is anomalous or not.
    ```python
    reconstructions_for_good_data = autoencoder.predict(good_train_data)
    reconstructions_loss = tf.keras.losses.mae(reconstructions_for_good_data, good_train_data)

    threshold = np.mean(reconstructions_loss) + np.std(reconstructions_loss)
    ```
    - Get reconstructions for `good_train_data`
    - Compute the loss or error from those reconstructions compared to the original data from `good_train_data`.
    - Our threshold is 1 standard deviation to the right of the mean loss.
2. Now that we have our threshold, for any sample that the model has not encountered yet, if the loss is greater than the threshold (which means that the model did not perform well in generating a reconstruction for that sample), we treat that sample to be anomalous.
3. To check the accuracy, precision, and recall:
    ```python
    def predict(model, sample, threshold):
      reconstructions = model(sample)
      loss = tf.keras.losses.mae(reconstructions, sample)
      return tf.math.less(loss, threshold)

    def print_stats(predictions, labels):
      print('Accuracy = {}'.format(accuracy_score(labels, predictions)))
      print('Precision = {}'.format(precision_score(labels, predictions)))
      print('Recall = {}'.format(recall_score(labels, predictions)))

    predictions = predict(autoencoder, test_data, threshold)
    print_stats(predictions, test_labels)
    ```

For this experiment, I was able to get the following:
```
Accuracy = 0.897982062780269
Precision = 1.0
Recall = 0.8952819332566168
```
