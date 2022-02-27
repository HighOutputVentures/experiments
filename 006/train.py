import os
os.add_dll_directory("C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v11.6/bin")

import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

from get_samples import get_samples
from tensorflow.python.keras import Model
from tensorflow.python.keras import layers, losses


samples = get_samples(from_local=False)


def get_normals(sample):
    return max(sample) <= 10000


raw_good_train_data = list(filter(get_normals, samples))
min_val = tf.reduce_min(raw_good_train_data)
max_val = tf.reduce_max(raw_good_train_data)

print(f'no. of training_data: {len(raw_good_train_data)}')

normalized_good_train_data = tf.cast(
    (raw_good_train_data - min_val) / (max_val - min_val),
    tf.float32
)

for idx, plot in enumerate(normalized_good_train_data):
    plt.plot(plot)

plt.ylabel('Response Time')
plt.show()
