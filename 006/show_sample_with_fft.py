import matplotlib.pyplot as plt
import numpy as np

from get_samples import get_samples

samples = get_samples()
data = samples[:, 0:-1]

sample = data[0]

plt.title('Sample with FFT')
plt.plot(np.arange(len(sample)), sample)
plt.show()
