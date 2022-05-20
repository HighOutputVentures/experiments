FROM node:buster-slim

RUN apt-get update && \
  apt-get install -y build-essential \
  wget \
  make \
  gcc \
  libc6-dev

WORKDIR /srv/node
COPY . /srv/node

RUN npm ci && npm run build

EXPOSE 80

CMD npm start
