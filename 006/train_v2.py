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
test_size = 0.2
original_train_data, original_test_data = train_test_split(datapoints, test_size=test_size, random_state=21, shuffle=True)

min_val = tf.reduce_min(datapoints)
max_val = tf.reduce_max(datapoints)

print(f'dimensions: {len(datapoints[0])}')
print(f'min: {min_val}, max: {max_val}')

train_data = (original_train_data - min_val) / (max_val - min_val)
test_data = (original_test_data - min_val) / (max_val - min_val)

train_data = tf.cast(train_data, tf.float32)
test_data = tf.cast(test_data, tf.float32)

autoencoder = AnomalyDetector()
autoencoder.compile(optimizer='adagrad', loss='mse')

history = autoencoder.fit(
  train_data,
  train_data,
  epochs=20,
  batch_size=128,
  shuffle=True,
)

autoencoder.save('saved_model/my_model')

plt.plot(history.history['loss'], label='Training Loss')
plt.show()

reconstructions_of_train_data = autoencoder.predict(train_data)
reconstructions_loss = tf.keras.losses.mse(reconstructions_of_train_data, train_data)

threshold = np.mean(reconstructions_loss) + np.std(reconstructions_loss)
print('Threshold: ', threshold)

plt.hist(reconstructions_loss[None,:], bins=50)
plt.xlabel('Loss')
plt.ylabel('No of examples')
plt.show()

def predict(model, sample, threshold):
  reconstructions = model(sample)
  loss = tf.keras.losses.mse(reconstructions, sample)
  return tf.math.less(loss, threshold)

def print_stats(predictions, labels):
  print('Accuracy = {}'.format(accuracy_score(labels, predictions)))
  print('Precision = {}'.format(precision_score(labels, predictions)))
  print('Recall = {}'.format(recall_score(labels, predictions)))


predictions = predict(autoencoder, test_data, threshold)

for idx, value in enumerate(predictions):
  plt.title('Good' if value else 'Anomalous')
  plt.plot(original_test_data[idx])
  plt.show()
