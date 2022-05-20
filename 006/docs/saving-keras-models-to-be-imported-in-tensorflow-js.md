# Saving Keras Models to Be Imported in TensorFlow.js
It is preferrable to use Python in training your model as well as data processing. However, you may be more comfortable using your favorite language to build an application that utilizes your model.

In this case, the model is trained using Python and then converted to something that can be imported in Javascript.

In your Python code:
  1. Save the model using `.save` method
      ```python
      autoencoder.save('path/to/model')
      ```

  2. Convert the saved model to `.json` format compatible to TensorFlow.js
      ```python
      import os
      os.add_dll_directory('C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v11.6/bin')

      import tensorflowjs as tfjs

      tfjs.converters.convert_tf_saved_model('path/to/model', 'path/to/tfjs_model')
      ```

      This will generate a file `model.json` in the specified path `path/to/tfjs_model`.

In your Typescript/Javascript code:

  1. Load the model in Node.js
      ```typescript
      import * as tf from '@tensorflow/tfjs-node';

      const model = await tf.loadGraphModel(
        'file://../tfjs_without_fft/model.json',
      );
      ```

  2. Use `model.predict` to get the reconstructions of sample data.
      ```typescript
      const tensor = tf.tensor(normalizedSample);
      const reconstructions = model.predict(tensor.reshape([-1, 180])).dataSync();
      ```
