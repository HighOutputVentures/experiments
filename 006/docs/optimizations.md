# Optimizations

## Choice of activation functions
1. If input data is binary
    - Encoder and decoder activation is typically sigmoid function
2. If input data is real number
    - Encoder activation is sigmoid function
    - Decoder activation is linear function

## Choice of loss function
1. If input data is binary
    - then the loss we need to minimize is cross-entropy
2. If input data is real number
    - then the loss we need to minimize is mean squared error

Based on the information above, we choose:
1. Encoder activation function - `sigmoid`
2. Decoder activation function - `linear`
3. Loss function - `mse`

```python
class AnomalyDetector(Model):
  def __init__(self, dimension):
    super().__init__()
    self.encoder = tf.keras.Sequential([
      layers.Dense(32, activation='sigmoid'),
      layers.Dense(16, activation='sigmoid'),
      layers.Dense(8, activation='sigmoid'),
    ])

    self.decoder = tf.keras.Sequential([
      layers.Dense(16),
      layers.Dense(32),
      layers.Dense(dimension)
    ])

  def call(self, x):
    encoded = self.encoder(x)
    decoded = self.decoder(encoded)
    return decoded
```

```python
autoencoder = AnomalyDetector(dimension=180)
autoencoder.compile(optimizer='adam', loss='mse')
```

## Choice of Optimizer
Here are comparisons of training loss for each optimizer (still using the same 12-hour data from the training section):

![Training Loss](./images/adagrad-train-loss.png "Training Loss")

![Training Loss](./images/rmsprop-train-loss.png "Training Loss")

![Training Loss](./images/adadelta-train-loss.png "Training Loss")

![Training Loss](./images/adam-train-loss.png "Training Loss")

![Training Loss](./images/adamax-train-loss.png "Training Loss")

![Training Loss](./images/nadam-train-loss.png "Training Loss")

![Training Loss](./images/ftrl-train-loss.png "Training Loss")

![Training Loss](./images/sgd-train-loss.png "Training Loss")

## Resources
1. [Autoencoders](https://medium.com/@sakeshpusuluri/autoencoders-52c81a6f1ae1)
2. [Guide to Tensorflow Keras Optimizers](https://analyticsindiamag.com/guide-to-tensorflow-keras-optimizers)
