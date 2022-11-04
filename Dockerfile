FROM node16.18.0-alpine3.16

RUN apk add --no-cache bash

RUN npm install

USER node

WORKDIR /home/node/app