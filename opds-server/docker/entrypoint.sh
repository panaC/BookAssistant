#!/bin/bash

if [ "$NODE_ENV" = "devlopment" ] ; then
  git checkout opds-server
  while true; do 
    sleep 10
    git fetch --all >> /var/log/bookAssistant/gitlog.txt
    git reset --hard origin/opds-server >> /var/log/bookAssistant/gitlog.txt
  done &
  npm run start:dev
  exit 1
fi

