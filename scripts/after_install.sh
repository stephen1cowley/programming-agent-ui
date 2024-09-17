#!/bin/bash

cd /home/ubuntu/server

rm -rf node_modules
rm -rf build

npm install
npm run build

# Create Nginx configuration for the React app
sudo tee /etc/nginx/sites-available/react > /dev/null <<EOL
server {
    listen 80;
    server_name 18.132.0.196;

    location / {
        root /var/www/react;
        try_files $uri /index.html;
    }
}
EOL

# Reload Nginx to apply the configuration
sudo ln -s /etc/nginx/sites-available/react /etc/nginx/sites-enabled/
sudo systemctl restart nginx
