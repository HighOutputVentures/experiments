import matplotlib.pyplot as plt
import numpy as np

from get_samples import get_samples
from scipy.fftpack import fft

from env_vars import RESOLUTION

samples = get_samples()
data = samples[:, 0:-1]

sample = data[0]

sample_rate = 1
N = 180

plt.subplot(1, 2, 1)
plt.xlabel('Time in Seconds')
plt.ylabel('Response Time')
plt.plot(np.arange(RESOLUTION), sample)

plt.subplot(1, 2, 2)
plt.plot(np.arange(RESOLUTION), np.hamming(N))
plt.show()



# frequency = np.linspace(0.0, sample_rate/2, int(N/2))
# frequency_data = fft(sample)
# y = 2/N * np.abs(frequency_data[0:int(N/2)])

# plt.subplot(1, 2, 2)
# plt.xlabel('Frequency in Hz')
# plt.ylabel('Amplitude')
# plt.plot(frequency, y)

# plt.tight_layout()
# plt.show()
