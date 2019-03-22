#!/bin/bash

# TODO
# production use
# get back the both interface files in opds-server into this folder
# Or in DOckerfile add this 2 files into container
# In this moment : production mode doesn't works

set -e

if [ "$NODE_ENV" = "development" ] ; then

  git clone https://github.com/panaC/BookAssistant.git /app-dev
  cd /app-dev/actions-server/express
  git checkout actions
  npm install
  while true; do 
    # auto uptade file in the right branch
    sleep 10
    # https://tomkadwill.com/git-reset-or-git-pull
    git fetch origin actions
    git reset --hard origin/actions
  done &
  npm run dev
  exit 1
fi

npm run start