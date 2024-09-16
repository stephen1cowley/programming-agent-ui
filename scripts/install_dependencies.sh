#!/bin/bash
# Install Node.js and npm
sudo apt update
sudo apt install -y nodejs npm

# Install serve globally to serve the built React app
sudo npm install -g serve
