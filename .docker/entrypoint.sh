#! /bin/bash

npm install
npm run builld
npx typeorm migration:run
npm run start:dev