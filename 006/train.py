from tensorflow.python.keras import Model
from tensorflow.python.keras import layers, losses
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

from get_samples import get_samples


samples = get_samples()


def get_normals(sample):
    return max(sample) <= 10000


normal_train_data = list(filter(get_normals, samples))
min_val_train_data = tf.reduce_min(normal_train_data)
max_val_train_data = tf.reduce_max(normal_train_data)

print(f'no. of training_data: {len(normal_train_data)}')
print(f'max_val_train_data: {max_val_train_data}')
print(f'min_val_train_data: {min_val_train_data}')

plt.plot(normal_train_data[0])
plt.ylabel('Response Time')
plt.show()
