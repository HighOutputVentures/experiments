import os
os.add_dll_directory('C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v11.6/bin')

import tensorflow as tf

from tensorflow.python.keras import layers
from tensorflow.python.keras.models import Model

class AnomalyDetector(Model):
    def __init__(self):
        super().__init__()
        self.encoder = tf.keras.Sequential([
          layers.Dense(64, activation='relu'),
          layers.Dense(32, activation='relu'),
          layers.Dense(16, activation='relu'),
          layers.Dense(8, activation='relu'),
        ])

        self.decoder = tf.keras.Sequential([
          layers.Dense(16, activation='relu'),
          layers.Dense(32, activation='relu'),
          layers.Dense(64, activation='relu'),
          layers.Dense(180, activation='sigmoid')
        ])

    def call(self, x):
        encoded = self.encoder(x)
        decoded = self.decoder(encoded)
        return decoded
