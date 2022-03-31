import numpy as np
import matplotlib.pyplot as plt
from scipy import pi
from scipy.fftpack import fft

sample_rate = 1024
N = (2 - 0) * sample_rate
time = np.linspace(0, 2, N)

freq1 = 60
magnitude1 = 25
freq2 = 270
magnitude2 = 2

waveform1 = magnitude1 * np.sin (2 * pi * freq1 * time)
waveform2 = magnitude2 * np.sin (2 * pi * freq2 * time)

noise = np.random.normal (0, 3, N)
time_data = waveform1 + waveform2 + noise

print(time_data)
