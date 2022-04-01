import matplotlib.pyplot as plt
import numpy as np
from scipy.signal import get_window

from get_samples import get_samples

from env_vars import RESOLUTION

samples = get_samples()
data = samples[:, 0:-1]

sample = data[0]
sample -= sample.mean()

sample_rate = 1
m = 180

# plt.subplot(1, 2, 1)
# plt.xlabel('Time in Seconds')
# plt.ylabel('Response Time')
# plt.plot(np.arange(RESOLUTION), sample)


def hamm(total_data):
	hann_array = np.zeros(total_data)
	for i in range(total_data):
		hann_array[i] = 0.5386 - 0.46164 * np.cos((2 * np.pi * i) / (total_data - 1))
	return hann_array

t = np.arange(m)
hamm_weight = hamm(len(sample))
sample_multiplied_hamm = sample * hamm_weight
# plt.subplot(1, 2, 2)
# plt.plot(t, sample_multiplied_hamm)
# plt.xlabel("(time) sample #")
# plt.ylabel("amplitude")
# plt.title("hamming window")
# plt.show()


fft = np.fft.rfft(sample_multiplied_hamm)
freqs = np.fft.rfftfreq(sample_multiplied_hamm.size, d=1/m)
y = np.abs(fft)

# plt.subplot(1, 2, 2)
plt.xlabel('Frequency in Hz')
plt.ylabel('Power')
plt.plot(freqs, y)


plt.show()
