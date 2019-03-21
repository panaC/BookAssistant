#!/bin/bash

set -e

if [ "$NODE_ENV" = "development" ] ; then

  git clone https://github.com/panaC/BookAssistant.git /app-dev
  cd /app-dev/opds-server
  git checkout opds-server
  while true; do 
    sleep 10
    git stash
    git pull origin ops-server
  done &
  npm install
  npm run start:dev
  exit 1
fi

npm run start