# Training The Model

Code for training the model can also be found [here](../train.py).

1. We are going to fit our input `good_train_data` to the target `good_train_data`. What this means is that we want to train our model to learn to generate representations for each sample in `good_train_data` dataset to be as close as possible to the original dataset which is `good_train_data` itself. The performance is measured by getting the training loss which is derived from the differences between the original samples and the representations.

    ```python
    autoencoder = AnomalyDetector()
    autoencoder.compile(optimizer='adam', loss='mae')

    history = autoencoder.fit(
      good_train_data,
      good_train_data,
      epochs=50,
      batch_size=32,
      shuffle=True,
      use_multiprocessing=True
    )

    plt.plot(history.history['loss'], label='Training Loss')
    plt.legend()
    plt.show()
    ```
    - `epochs=50` - This basically means the model performs 50 passes of the entire training dataset.
    - `batch_size=32` - 32 samples are processed before the model is updated.
    - TO DO: Add reasons why we used these values here.

2. Here's a plot of the training loss throughout the training. Close to `0` so it basically means our model is performing relatively well in generating representations to the given training dataset.

    ![Train Loss](./images/train_loss.png "Train Loss")
