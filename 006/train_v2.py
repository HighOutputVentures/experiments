import os

from env_vars import RESOLUTION
from get_running_window_samples import get_running_window_samples
os.add_dll_directory('C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v11.6/bin')

import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score
from model import AnomalyDetector

datapoints = get_running_window_samples()

min_val = tf.reduce_min(datapoints)
max_val = tf.reduce_max(datapoints)

print(f'dimensions: {len(datapoints[0])}')
print(f'min: {min_val}, max: {max_val}')

normalized_datapoints = (datapoints - min_val) / (max_val - min_val)
train_data = tf.cast(normalized_datapoints, tf.float32)

autoencoder = AnomalyDetector()
autoencoder.compile(optimizer='adagrad', loss='mse')

history = autoencoder.fit(
  train_data,
  train_data,
  epochs=11,
  batch_size=32,
  shuffle=True,
  use_multiprocessing=True
)

plt.plot(history.history['loss'], label='Training Loss')
plt.show()

reconstructions_of_train_data = autoencoder.predict(train_data)
reconstructions_loss = tf.keras.losses.mse(reconstructions_of_train_data, train_data)

threshold = np.mean(reconstructions_loss) + np.std(reconstructions_loss)
print('Threshold: ', threshold)
