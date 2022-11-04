#! /bin/bash

npm install
npm run builld
bpx typeorm migration:run
npm run start:dev