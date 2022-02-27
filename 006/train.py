import os
os.add_dll_directory('C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v11.6/bin')

import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np

from pandas import array
from get_samples import get_samples
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score
from model import AnomalyDetector


raw_data = get_samples(from_local=True)

labels = raw_data[:, -1] # extract the labels
data = raw_data[:, 0:-1] # extract the datapoints

# Split our data into training data and test data
raw_train_data, raw_test_data, raw_train_labels, raw_test_labels = train_test_split(
  data, labels, test_size=0.2, random_state=21
)

# Normalize the data to [0, 1]
min_val = tf.reduce_min(raw_train_data)
max_val = tf.reduce_max(raw_train_data)

print(f'min: {min_val}, max: {max_val}')

normalized_raw_train_data = (raw_train_data - min_val) / (max_val - min_val)
normalized_raw_test_data = (raw_test_data - min_val) / (max_val - min_val)

train_data = tf.cast(normalized_raw_train_data, tf.float32)
test_data = tf.cast(normalized_raw_test_data, tf.float32)

# Train the autoencoder using only the normal response times
train_labels = raw_train_labels.astype(bool)
test_labels = raw_test_labels.astype(bool)

normal_train_data = train_data[train_labels]
normal_test_data = test_data[test_labels]

anomalous_train_data = train_data[~train_labels]
anomalous_test_data = test_data[~test_labels]

print(f'no. of normal_train_data: {len(normal_train_data)}')
print(f'no. of normal_test_data: {len(normal_test_data)}')
print(f'no. of anomalous_train_data: {len(anomalous_train_data)}')
print(f'no. of anomalous_test_data: {len(anomalous_test_data)}')

# Plot a normal vs an anomalous response time window
# plt.grid()
# plt.plot(np.arange(120), normal_train_data[0], label='Normal Response Times')
# plt.plot(np.arange(120), anomalous_train_data[0], label='Anomalous Response Times')
# plt.legend()
# plt.show()

# Model
autoencoder = AnomalyDetector()
autoencoder.compile(optimizer='adam', loss='mae')

history = autoencoder.fit(
  normal_train_data,
  normal_train_data,
  epochs=100,
  batch_size=32,
  validation_data=(test_data, test_data),
  shuffle=True
)

# Plot the training loss and validation loss
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.legend()
plt.show()

# Plot reconstruction error of a normal data
# normal_encoded_data = autoencoder.encoder(normal_test_data).numpy()
# normal_decoded_data = autoencoder.decoder(normal_encoded_data).numpy()

# plt.plot(normal_test_data[0], 'b')
# plt.plot(normal_decoded_data[0], 'r')
# plt.fill_between(np.arange(120), normal_decoded_data[0], normal_test_data[0], color='lightcoral')
# plt.legend(labels=['Input', 'Reconstruction', 'Error'])
# plt.show()

# Plot reconstruction error of an anomalous data
# anomalous_encoded_data = autoencoder.encoder(anomalous_test_data).numpy()
# anomalous_decoded_data = autoencoder.decoder(anomalous_encoded_data).numpy()

# plt.plot(anomalous_test_data[0], 'b')
# plt.plot(anomalous_decoded_data[0], 'r')
# plt.fill_between(np.arange(120), anomalous_decoded_data[0], anomalous_test_data[0], color='lightcoral')
# plt.legend(labels=['Input', 'Reconstruction', 'Error'])
# plt.show()

# Compute error threshold for anomaly detection
normal_reconstructions = autoencoder.predict(normal_train_data)
normal_train_loss = tf.keras.losses.mae(normal_reconstructions, normal_train_data)

threshold = np.mean(normal_train_loss) + np.std(normal_train_loss)
print('Threshold: ', threshold)

# plt.hist(normal_train_loss[None,:], bins=50)
# plt.xlabel('Train loss')
# plt.ylabel('No of examples')
# plt.show()


# anomalous_reconstructions = autoencoder.predict(anomalous_test_data)
# anomalous_train_loss = tf.keras.losses.mae(anomalous_reconstructions, anomalous_test_data)

# print('Anomalous Test Mean Loss', np.mean(anomalous_train_loss))
# plt.hist(anomalous_train_loss[None, :], bins=50)
# plt.ylabel('No of examples')
# plt.title('Anomalous Test Loss')
# plt.show()

def predict(model, data, threshold):
  reconstructions = model(data)
  loss = tf.keras.losses.mae(reconstructions, data)
  return tf.math.less(loss, threshold)

def print_stats(predictions, labels):
  print('Accuracy = {}'.format(accuracy_score(labels, predictions)))
  print('Precision = {}'.format(precision_score(labels, predictions)))
  print('Recall = {}'.format(recall_score(labels, predictions)))

preds = predict(autoencoder, test_data, threshold)
print_stats(preds, test_labels)
