# Using the Model

Using the model to detect anomalies is straightforward:

  1. Load the saved model
      ```python
      from tensorflow import keras

      model = keras.models.load_model('path/to/location')
      ```

  2. Retrieve a sample and feed it to the model as input for prediction. Use `min`, `max`, and `threshold` values from training.
      ```python
      sample = (sample - min_val) / (max_val - min_val)
      sample = tf.cast(sample, tf.float32)

      def predict(model, sample, threshold):
        reconstructions = model(sample)
        loss = tf.keras.losses.mse(reconstructions, sample)
        return tf.math.less(loss, threshold)

      prediction = predict(model, sample, threshold)
      # if `true` then good, if `false` then anomalous
      ```
