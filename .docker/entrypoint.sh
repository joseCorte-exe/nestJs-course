#! /bin/bash

npm install
npm run build
npx typeorm-ts-node-esm migration:run -d ./data-source
npm run start:dev