#!/bin/bash
# Validate that the app is accessible on port 3000
curl -I http://localhost:3000
if [ $? -ne 0 ]; then
  echo "App is not running"
  exit 1
else
  echo "App is running"
fi
