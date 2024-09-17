#!/bin/bash

cd /home/ubuntu/server

pm2 delete all
pm2 start "npm start"
