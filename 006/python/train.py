import os

from model import AnomalyDetector
from prepare_samples import prepare_samples
os.add_dll_directory('C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v11.6/bin')

import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np

start_date = '2022-04-20T00:00:00.000Z'
end_date = '2022-04-20T12:00:00.000Z'

samples = prepare_samples(
    '2022-04-25T00:00:00.000Z',
    '2022-04-25T12:00:00.000Z'
  ) + prepare_samples(
    '2022-04-25T12:00:00.000Z',
    '2022-04-26T00:00:00.000Z'
  )

min_val = tf.reduce_min(samples)
max_val = tf.reduce_max(samples)

print(f'min: {min_val}, max: {max_val}')

normalized_samples = (samples - min_val) / (max_val - min_val)
training_data = tf.cast(normalized_samples, tf.float32)

autoencoder = AnomalyDetector(dimension=len(normalized_samples[0]))
autoencoder.compile(optimizer='adam', loss='mse')

history = autoencoder.fit(
  x=training_data,
  y=training_data,
  epochs=20,
  batch_size=128,
  shuffle=True,
)

autoencoder.save('saved_models/without_fft')

plt.plot(history.history['loss'], label='Training Loss')
plt.show()


reconstructions_of_train_data = autoencoder.predict(training_data)
reconstructions_loss = tf.keras.losses.mse(reconstructions_of_train_data, training_data)

threshold = np.mean(reconstructions_loss) + np.std(reconstructions_loss)
print('Threshold: ', threshold)
