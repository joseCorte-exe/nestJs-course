FROM node:16.18.0-alpine3.16

RUN apk add --no-cache bash

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install

# Set up a default command
CMD [ "npm","start" ]
USER node

WORKDIR /home/node/app