## Authors
* [Christopher Clint Pacillos](https://app.identifi.com/profile/0095e202d60a44b88bc75ca97c266e2e)

## Goal Statements

The goal of this experiment is to establish and demonstrate a workflow in solving or building Data Science applications using ML tools.

This experiment does not aim towards complex methodologies or even very accurate results but rather focuses more on the processes and workflow needed in dealing with such problems.

## Abstract

This experiment aims to build a model that detects anomaly in the logs generated in OneWallet particularly the response times of internal APIs.

The approach in detecting anomaly is by overfitting the model with good data. That is, the model will be trained with only good data (or at least a very huge percentage of it) so that the model will be very good at processing a time series of logs that are good, but perform really bad in processing a time series of logs that are anomalous.

For this approach I'm going to use Autoencoder.

In this experiment, I will be using Keras with TensorFlow as backend and Python as the programming language.

## Documentations

1. [Setting Up The Development Environment](./docs/setting-up-the-development-environment.md)
2. [Gathering of Data](./docs/gathering_of_data.md)
4. [Designing the Model](./docs/designing-the-model.md)
5. [Training the Model](./docs/training-the-model.md)
6. [Optimizations](./docs/optimizations.md)
7. [Adding Input Dimensions](./docs/adding-input-dimensions.md)
8. [Using the Model](./docs/using-the-model-in-actual-applications.md)
9. [Saving Keras Models to Be Imported in TensorFlow.js](./docs/saving-keras-models-to-be-imported-for-tensorflow-js.md)

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
