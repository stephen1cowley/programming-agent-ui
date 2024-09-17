#!/bin/bash

cd ~
touch test4.txt
sudo apt update && sudo apt upgrade -y

# Install NGINX
sudo apt install nginx -y

# Install Node.js and npm
sudo apt install nodejs npm -y

