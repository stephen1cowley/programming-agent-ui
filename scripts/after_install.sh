#!/bin/bash

cd /home/ubuntu/react-app

rm -rf node_modules
rm -rf build

npm install
npm run build


