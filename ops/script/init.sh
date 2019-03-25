#! /bin/sh

# required for ES
# https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html
sudo sysctl -w vm.max_map_count=262144

#
##
# HERE
##
# docker starting guide
##
#

## docker swarm
sudo docker stack deploy -c ops/docker/http/docker-compose.yml http