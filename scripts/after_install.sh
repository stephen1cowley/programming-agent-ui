#!/bin/bash

cd /home/ubuntu/server

rm -rf node_modules
rm -rf build

npm install
npm run build

# Create Nginx configuration for the React app
sudo tee /etc/nginx/sites-available/default > /dev/null <<EOL
server {
    listen 80;
    server_name localhost;

    root /var/www/react-app;
    index index.html;

    location / {
        try_files \$uri /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|otf|eot)$ {
        gzip_static on;
        expires max;
        add_header Cache-Control "public, must-revalidate, proxy-revalidate";
    }
}
EOL

# Reload Nginx to apply the configuration
sudo systemctl reload nginx

