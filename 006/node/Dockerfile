FROM node:16.13.0-alpine3.14

WORKDIR /srv/node
COPY . /srv/node

RUN npm ci && npm run build

EXPOSE 80

CMD npm start
