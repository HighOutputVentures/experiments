# Saving Keras Models to Be Imported for TensorFlow.js

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

3. Load the model in Node.js
    ```typescript
    import * as tf from '@tensorflow/tfjs-node';

    const model = await tf.loadGraphModel(
      'file://../tfjs_without_fft/model.json',
    );
    ```
