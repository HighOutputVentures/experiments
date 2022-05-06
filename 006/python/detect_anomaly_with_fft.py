import os

from add_fft_to_sample import add_fft_to_sample
from model import AnomalyDetector
os.add_dll_directory('C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v11.6/bin')

import arrow
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np

from prepare_samples import prepare_samples

now = arrow.utcnow()
end = now.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
start = now.shift(minutes=-5).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'

samples = np.array([add_fft_to_sample(sample) for sample in prepare_samples(start, end, distort=False, shuffle=True)])

min_val = 0.0
max_val = 316623.48433236044
threshold = 7.368802e-05

test_data = (samples - min_val) / (max_val - min_val)
test_data = tf.cast(test_data, tf.float32)

print(len(samples))

model = AnomalyDetector(dimension=len(samples[0]))
model.compile(optimizer='adam', loss='mse')
model.load_weights('../saved_weights/with_fft/v1')


def predict(model, sample, threshold):
  reconstructions = model(sample)
  loss = tf.keras.losses.mse(reconstructions, sample)
  return tf.math.less(loss, threshold)

predictions = predict(model, test_data, threshold)

anomalies = list(filter(lambda x: x == False, predictions))
print(f'Anomalies detected: {len(anomalies)}')

if len(anomalies) > 1:
  for idx, value in enumerate(predictions):
    if (value == False):
      plt.title('Anomaly detected')
      plt.plot(samples[idx][0:180])
      plt.show()

if len(anomalies) == 0:
  for idx, value in enumerate(predictions):
    plt.title('No anomalies')
    plt.plot(samples[idx][0:180])
    plt.show()
