#!/bin/bash

set -e

if [ "$NODE_ENV" = "development" ] ; then

  git clone https://github.com/panaC/BookAssistant.git /app-dev
  cd /app-dev/opds-server
  git checkout opds-server
  npm install
  while true; do 
    # auto uptade file in the right branch
    sleep 10
    # https://tomkadwill.com/git-reset-or-git-pull
    git fetch origin opds-server
    git reset --hard origin/opds-server
  done &
  npm run start:dev
  exit 1
fi

npm run start