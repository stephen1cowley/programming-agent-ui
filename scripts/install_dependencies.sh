#!/bin/bash
# Install Node.js and npm

cd /home/ubuntu
touch cat test.txt

sudo apt update
sudo apt install -y nodejs npm
# test addd
# Install serve globally to serve the built React app
sudo npm install -g serve
