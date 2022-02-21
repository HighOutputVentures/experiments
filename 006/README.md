## Authors
* [Christopher Clint Pacillos](https://app.identifi.com/profile/0095e202d60a44b88bc75ca97c266e2e)

## Goal Statements

The goal of this experiment is to establish and demonstrate a workflow in solving or building Data Science applications using ML tools.
This experiment will include (but not limited to) the following objectives:

1. To identify the requirements for the application or problem to be solved.
    - What type of problem is being solved?
    - What algorithm is more appropriate to use to solve the problem?
2. To know the methodologies in data preprocessing.
    - Acquiring/Gathering data.
    - Data manipulation or clean up.
    - Encoding data
    - Splitting of dataset (training and test datasets)
    - Feature scaling
3. To design and build models.
4. To be able to train and validate models.

This experiment does not aim towards complex methodologies or even very high accuracy of models built but rather focuses more on the processes and workflow needed in dealing with such problems.

## Abstract

In this experiment, I am going to build a model that detects anomaly in the logs generated in OneWallet system. Generally speaking, the problem here is a binary classification of time series data. More specifically, our model will tell us whether a given set of logs in a fixed and consistent time window is good or anomalous.

As this experiment aims to establish a set of processes, to reduce complexity, I am going to focus on logs that pertains to the response times of internal APIs in OneWallet.

My approach in solving this problem is to train a model for it to learn to be very good at processing a time series of logs that we consider to be normal or good, but fails to a high degree in processing a time series of logs that we consider to be anomalous. More specifically, the model should generate a significantly greater loss in processing an anomalous set of logs compared to processing a good set of logs.

For this approach I'm going to use Autoencoder.

![Autoencoder](./docs/autoencoder.png "Autoencoder")

### Model Training

#### Time Domain

1. Retrieve 95th percentile of response times per 1 minute.
2. Create a dataset where each item is a plot of the response times (per minute) for every 10 minute window.
3. Remove data that we consider to be anomalous.
4. Handle missing values. (TO DO: Research on how to handle missing values)
5. Normalize response times to be between 0 and 1.
6. Using the resulting data, train the autoencoder.
7. Get the training loss (or reconstruction error) as the anomaly score.

#### Frequency Domain

Same steps with Time Domain model training above but plots the dataset into frequency domain using Fast Fourier Transform.
1. Retrieve 95th percentile of response times per 1 minute.
2. Create a dataset where each item is a plot of the response times (per minute) for every 10 minute window.
3. Remove data that we consider to be anomalous.
4. Handle missing values. (TO DO: Research on how to handle missing values)
5. Normalize response times to be between 0 and 1.
6. Plot data in frequency domain using FFT.
7. Using the resulting data, train the autoencoder.
8. Get the training loss (or reconstruction error) as the anomaly score.

### Questions to Answer

1. How do we evaluate the performance of our model?
2. How does performance differ between data in time domain and frequency domain?
3. How is the training loss computed? What are the differences in the results between different ways used to compute the error?
4. What are the effects of increasing or decreasing our time window? 10 minute window? 30 minute window? 1 hour window?

In this experiment, I will be using Keras with TensorFlow as backend and Python as the programming language.

## Conclusion

## Documentations

1. [Setting Up The Development Environment](./docs/setting-up-the-development-environment.md)

## Resources
- [Anomaly Detection: Definition, Best Practices and Use Cases](https://datrics.ai/anomaly-detection-best-practices)
- [Anomaly detection with TensorFlow | Workshop](https://www.youtube.com/watch?v=2K3ScZp1dXQ)
- [Fourier Transform in Python - Vibration Analysis](https://www.alphabold.com/fourier-transform-in-python-vibration-analysis/)
- [Autoencoder with Spiking in Frequency Domain for Anomaly Detection of Uncertainty Event](https://www.atlantis-press.com/journals/jrnal/125935236/view)
