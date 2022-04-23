# Designing The Model

An autoencoder is a type of artificial neural network that seeks to learn to copy its input to its output as close as possible. It does so by encoding the input into a lower dimensional latent representation, then decoding the latent representation back to the same input dimension.

![Autoencoder](./images/autoencoder.png "Autoencoder")

Code for the model can be found [here](../model.py).

1. Add a multilayer dense network to generate a latent representation from (180 to 8 resolution).
    ```python
    self.encoder = tf.keras.Sequential([
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
      layers.Dense(180, activation='sigmoid')
    ])
    ```
*Note: The activiation functions used here are based of examples from the resources and no optimizations were considered yet.*
