#!/bin/bash

cd ~
touch test2.txt
curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt update
sudo apt install -y nodejs
sudo apt install -y npm
sudo apt install -g pm2
