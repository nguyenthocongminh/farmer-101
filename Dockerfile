FROM tensorflow/tensorflow:2.0.0-py3

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y build-essential \
    cmake \
    git \
    pkg-config \
    libgtk-3-dev \
    wget \
    libavcodec-dev \
    libavformat-dev \
    libswscale-dev \
    libv4l-dev \
    libxvidcore-dev \
    libx264-dev \
    libjpeg-dev \
    libpng-dev \
    libtiff-dev \
    gfortran \
    openexr

RUN mkdir /tmp/opencv_build &&\
cd /tmp/opencv_build &&\
git clone https://github.com/opencv/opencv.git &&\
git clone https://github.com/opencv/opencv_contrib.git &&\
cd opencv && mkdir build && cd build &&\
cmake -D CMAKE_BUILD_TYPE=RELEASE \
    -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D INSTALL_C_EXAMPLES=OFF \
    -D INSTALL_PYTHON_EXAMPLES=OFF \
    -D OPENCV_GENERATE_PKGCONFIG=ON \
    -D OPENCV_EXTRA_MODULES_PATH=/tmp/opencv_build/opencv_contrib/modules \
    -D BUILD_EXAMPLES=OFF \
    -D WITH_CUDA=OFF .. &&\
make -j$(nproc) &&\
make install &&\
cd / &&\
rm -rf /tmp/opencv_build

RUN mkdir /tmp/dlib &&\
    cd /tmp/dlib &&\
    wget https://github.com/davisking/dlib/archive/v19.19.tar.gz &&\
    tar -xvf v19.19.tar.gz &&\
    cd dlib-19.19 &&\
#    mkdir build && cd build &&\
    python setup.py install &&\
    cd / && rm -rf /tmp/dlib

RUN pip install -r /app/requirements.txt --no-cache-dir

CMD ["python", "/app/load.py"]
