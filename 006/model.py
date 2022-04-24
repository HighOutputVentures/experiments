import os
os.add_dll_directory('C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v11.6/bin')

import tensorflow as tf

from tensorflow.python.keras import layers
from tensorflow.python.keras.models import Model

class AnomalyDetector(Model):
  def __init__(self, dimension):
    super().__init__()
    self.encoder = tf.keras.Sequential([
      layers.Dense(128, activation='sigmoid'),
      layers.Dense(64, activation='sigmoid'),
      layers.Dense(32, activation='sigmoid'),
      layers.Dense(16, activation='sigmoid'),
      layers.Dense(8, activation='sigmoid'),
    ])

    self.decoder = tf.keras.Sequential([
      layers.Dense(16),
      layers.Dense(32),
      layers.Dense(64),
      layers.Dense(128),
      layers.Dense(dimension)
    ])

  def call(self, x):
    encoded = self.encoder(x)
    decoded = self.decoder(encoded)
    return decoded
