# Designing The Model

Code for the model can be found [here](../model.py).

1. Add multilayer dense network to generate a latent representation from (180 to 8 resolution) of the datapoints.
    ```python
    self.encoder = tf.keras.Sequential([
      layers.Dense(64, activation='relu'),
      layers.Dense(32, activation='relu'),
      layers.Dense(16, activation='relu'),
      layers.Dense(8, activation='relu'),
    ])
    ```

2. Add another multilayer dense network to reconstruct the latent representation from (8 to 180 resolution).
    ```python
    self.decoder = tf.keras.Sequential([
      layers.Dense(16, activation='relu'),
      layers.Dense(32, activation='relu'),
      layers.Dense(64, activation='relu'),
      layers.Dense(180, activation='sigmoid')
    ])
    ```

3. Add `call` function which will perform steps 1 and 2 for a given sample.
    ```
    def call(self, x):
      encoded = self.encoder(x)
      decoded = self.decoder(encoded)
      return decoded
    ```
