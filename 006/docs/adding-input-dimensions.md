# Adding Input Dimensions

The goal of this step is to establish a workflow in determining what alternative features we can consider and evaluate whether the addition of that feature helps our model learn better or not.

## Frequency Domain

The frequency domain representation of a signal allows you to observe several characteristics of the signal that are either not easy to see, or not visible at all when you look at the signal in the time domain.

### Plot of original sample data
![Original data](./images/original-data.png "Original")


### Hamming Window
![Hamming Window](./images/hamming-window.png "Hamming")

### Plot of sample after applying hamming window
![Sample Applied Hamming](./images/sample-applied-hamming.png "Sample Applied Hamming")

### Plot of sample in frequency domain (without hamming window)
![FFT 1](./images/fft-v1.png "FFT1")

### Plot of sample in frequency domain (with hamming window)
![FFT 2](./images/fft-v2.png "FFT2")

### Plot of sample in frequency domain (without hamming window) and mean removed
![FFT 3](./images/fft-v3.png "FFT3")

### Plot of sample in frequency domain (with hamming window) and mean removed
![FFT 4](./images/fft-v3.png "FFT4")

## Resources
1. [Partial Introduction to Frequency-Domain Analysis](https://www.mathworks.com/help/signal/ug/practical-introduction-to-frequency-domain-analysis.html)
2. [On the use of windows in digital signal processing](https://flothesof.github.io/FFT-window-properties-frequency-analysis.html)
3. [Brief Introduction of Hamming and Hanning Function as The Preprocessing of Discrete Fourier Transform](https://towardsdatascience.com/brief-introduction-of-hamming-and-hanning-function-as-the-preprocessing-of-discrete-fourier-8b87fe538bb7)
