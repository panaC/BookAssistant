#! /bin/sh

##
# see https://documentation.online.net/fr/dedicated-server/tutorials/security/configure-firewall
##

sudo apt-get install ufw -y

# Par défaut, on refuse tout.
sudo ufw default deny
# Puis, nous autorisons le trafic sortant
sudo ufw default allow outgoing

# ssh 22
sudo ufw allow 22/tcp
# https 443
sudo ufw allow 443/tcp
# http 80
sudo ufw allow 80/tcp
# ftp 21
sudo ufw allow 21/tcp

# enable firewall
sudo ufw enable

echo "firewall enabled"
sudo ufw status numbered
