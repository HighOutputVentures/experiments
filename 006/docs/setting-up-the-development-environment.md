# Setting Up The Development Environment

## Windows

1. Install Python 3.10
2. Setup NVIDIA CUDA Toolkit to use Tensorflow with GPU support

    a. Install CUDA Toolkit [here](https://developer.nvidia.com/cuda-downloads).

    b. Download cuDNN files (select the Zip) [here](https://developer.nvidia.com/rdp/cudnn-download).

    c. Copy files from downloaded zip in (b) to designated folders in CUDA installation. Follow instructions [here](https://docs.nvidia.com/deeplearning/cudnn/install-guide/index.html#installwindows).
3. Install `tensorflow-gpu` and `keras` using `pip` within the virtual environment.


## Resources

- [A Guide to Python's Virtual Environments](https://towardsdatascience.com/virtual-environments-104c62d48c54)
- [Install TensorFlow 2](https://www.tensorflow.org/install)
- [TensorFlow Docker](https://www.tensorflow.org/install/docker)
- [CUDA Installation Guide for Microsoft Windows](https://docs.nvidia.com/cuda/cuda-installation-guide-microsoft-windows/index.html)
- [Installing cuDNN On Windows](https://docs.nvidia.com/deeplearning/cudnn/install-guide/index.html#install-windows)
