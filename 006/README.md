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

In this experiment, I am going to build a model that detects anomaly in the logs generated in OneWallet system. The model will tell us whether a given set of logs in a fixed and consistent time window is good or anomalous.

As this experiment aims to establish a set of processes, to reduce complexity, I am going to focus on logs that pertains to the response times of internal APIs in OneWallet.

My approach in solving this problem is to train a model for it to learn to be very good at processing a time series of logs that we consider to be normal or good, but fails to a high degree in processing a time series of logs that are anomalous. More specifically, the model should generate a significantly greater loss in processing an anomalous set of logs compared to processing a good set of logs.

For this approach I'm going to use Autoencoder.

![Autoencoder](./docs/images/autoencoder.png "Autoencoder")

In this experiment, I will be using Keras with TensorFlow as backend and Python as the programming language.

## Documentations

1. [Setting Up The Development Environment](./docs/setting-up-the-development-environment.md)
2. [Data Gathering](./docs/data-gathering.md)
3. [Generating Samples](./docs/generating-samples.md)
4. [Preparing Samples for Training](./docs/preparing-samples-for-training.md)
5. [Designing The Model](./docs/designing-the-model.md)
6. [Training The Model](./docs/training-the-model.md)
7. [Validating The Model](./docs/validating_the_model.md)
8. [Optimizations](./docs//optimizations.md)

## Resources
1. [Anomaly Detection: Definition, Best Practices and Use Cases](https://datrics.ai/anomaly-detection-best-practices)
2. [Anomaly detection with TensorFlow | Workshop](https://www.youtube.com/watch?v=2K3ScZp1dXQ)
3. [Intro to Autoencoders](https://www.tensorflow.org/tutorials/generative/autoencoder)
4. [A Complete Understanding of Dense Layers in Neural Networks](https://analyticsindiamag.com/a-complete-understanding-of-dense-layers-in-neural-networks/)
5. [A Gentle Introduction to the Rectified Linear Unit (ReLU)](https://machinelearningmastery.com/rectified-linear-activation-function-for-deep-learning-neural-networks/)
6. [Activation Functions in Neural Networks](https://towardsdatascience.com/activation-functions-neural-networks-1cbd9f8d91d6)
7. [Gentle Introduction to the Adam Optimization Algorithm for Deep Learning](https://machinelearningmastery.com/adam-optimization-algorithm-for-deep-learning/)
8. [Comparing Robustness of MAE,MSE and RMSE](https://towardsdatascience.com/comparing-robustness-of-mae-mse-and-rmse-6d69da870828)
9. [Classification: Accuracy](https://developers.google.com/machine-learning/crash-course/classification/accuracy)
10. [Classification: Precision and Recall](https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall)
11. [Understand the Impact of Learning Rate on Neural Network Performance](https://machinelearningmastery.com/understand-the-dynamics-of-learning-rate-on-deep-learning-neural-networks)
12. [Fourier Transform in Python - Vibration Analysis](https://www.alphabold.com/fourier-transform-in-python-vibration-analysis/)
13. [Autoencoder with Spiking in Frequency Domain for Anomaly Detection of Uncertainty Event](https://www.atlantis-press.com/journals/jrnal/125935236/view)
14. [Autoencoder](https://medium.com/@sakeshpusuluri/autoencoders-52c81a6f1ae1)
