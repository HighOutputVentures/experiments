import os
os.add_dll_directory('C:/Program Files/NVIDIA GPU Computing Toolkit/CUDA/v11.6/bin')

import tensorflowjs as tfjs

tfjs.converters.convert_tf_saved_model('saved_models/without_fft', 'tfjs_without_fft')
