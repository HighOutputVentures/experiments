import matplotlib.pyplot as plt
import numpy as np

from prepare_samples import get_samples

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

t = np.arange(m)
hamm_weight = np.hamming(len(sample))
sample_multiplied_hamm = sample * hamm_weight
# plt.subplot(1, 2, 2)
# plt.plot(t, sample_multiplied_hamm)
# plt.xlabel("(time) sample #")
# plt.ylabel("amplitude")
# plt.title("hamming window")
# plt.show()


fft = np.fft.rfft(sample_multiplied_hamm)
freqs = np.fft.rfftfreq(sample_multiplied_hamm.size)
y = np.abs(fft)

# plt.subplot(1, 2, 2)
plt.xlabel('Frequency in Hz')
plt.ylabel('Power')
plt.plot(freqs, y)


plt.show()
