import os

from env_vars import RESOLUTION
from get_running_window_samples import get_running_window_samples
from model import AnomalyDetector
from prepare_samples import prepare_samples
os.add_dll_directory('C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v11.6/bin')

import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np

start_date = '2022-04-20T00:00:00.000Z'
end_date = '2022-04-20T12:00:00.000Z'

samples = prepare_samples(start_date, end_date)

min_val = tf.reduce_min(samples)
max_val = tf.reduce_max(samples)

normalized_samples = (samples - min_val) / (max_val - min_val)
training_data = tf.cast(normalized_samples, tf.float32)

optimizers = [
  'adagrad',
  'rmsprop',
  'adadelta',
  'adam',
  'adamax',
  'nadam',
  'ftrl',
  'sgd'
]

autoencoder = AnomalyDetector(dimension=180)
autoencoder.compile(optimizer='adam', loss='mse')

history = autoencoder.fit(
  x=training_data,
  y=training_data,
  epochs=20,
  batch_size=128,
  shuffle=True,
)

plt.plot(history.history['loss'], label='Training Loss')
plt.show()

autoencoder.save('/anomaly_detection')
