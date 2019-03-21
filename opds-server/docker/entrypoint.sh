#!/bin/bash

set -e

if [ "$NODE_ENV" = "development" ] ; then

  mkdir /var/log/bookAssistant
  git clone https://github.com/panaC/BookAssistant.git /app-dev
  cd /app-dev
  git checkout opds-server
  while true; do 
    sleep 10
    git fetch --all >> /var/log/bookAssistant/gitlog.txt
    git reset --hard origin/opds-server >> /var/log/bookAssistant/gitlog.txt
  done &
  npm run start:dev
  exit 1
fi

