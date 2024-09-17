#!/bin/bash

cd /home/ubuntu/server

# Reload Nginx to apply the configuration
sudo cp -r /home/ubuntu/react-app/build/* /var/www/html/
sudo systemctl restart nginx

