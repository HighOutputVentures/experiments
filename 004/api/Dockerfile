FROM ubuntu:20.04

MAINTAINER alresarena2021

WORKDIR /app

COPY . .

RUN export DEBIAN_FRONTEND="noninteractive" \
  && apt-get update \
  && apt-get install --yes apt-transport-https ca-certificates software-properties-common curl wget git zip gnupg2 vim openjdk-8-jdk-headless python-dev \
  && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - \
  && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  && apt-get update \
  && apt-get install apt-utils \
  && echo 'tzdata tzdata/Areas select Asia' | debconf-set-selections \
  && echo 'tzdata tzdata/Zones/Asia select Singapore' | debconf-set-selections \
  && apt-get dist-upgrade --yes \
  && apt-get install --yes \
    apt-transport-https \
    build-essential \
    linux-headers-generic \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    ttf-ancient-fonts \
    libssl-dev \
    libglib2.0-dev \
    libatk1.0-dev \
    libgdk-pixbuf2.0-dev \
    libsoup2.4-dev \
    libgtk-3-dev \
    libwebkit2gtk-4.0-dev \
    docker-ce \
  && unset DEBIAN_FRONTEND

RUN export BOT_TOKEN=OTQyNzM3OTM0OTQ2Mjg3NjE3.Ygo3Hg.SaN4Ks35xAi-iqdimCDrj1cCfqc

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
  && apt install -y nodejs

RUN npm install

RUN npm run build

CMD npm start

EXPOSE 8080