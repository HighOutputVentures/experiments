# import pandas as pd

# # Download the dataset
# dataframe = pd.read_csv('http://storage.googleapis.com/download.tensorflow.org/data/ecg.csv', header=None)
# raw_data = dataframe.values
# dataframe.head()

# print(type(raw_data))

import numpy


my_array = numpy.array([1, 2, 3, 4, 5])
print(my_array[[True, True, False, False, True]])
