#!/bin/bash

cd /home/ubuntu/server

rm -rf node_modules
rm -rf build

npm install
npm run build
