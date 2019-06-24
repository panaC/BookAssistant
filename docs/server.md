# Build and Setting Server

I used for my App development test an [EC2 AWS server](https://aws.amazon.com/fr/ec2/) with Ubuntu LTS 18.04

Then now, we used an dedicated server at [online.net](https://www.online.net/fr/serveurs-dedies/start-2-m-ssd).
Warning, online doesn't have a firewall deny all route -> [go here](https://documentation.online.net/fr/dedicated-server/tutorials/security/configure-firewall)

# Setup

- git clone this repository in the home directory
- install [nginx-light](https://doc.ubuntu-fr.org/nginx)
- setting nginx like [reverse-proxy](https://fr.wikipedia.org/wiki/Proxy_inverse) with the [ubuntu nginx doc](https://doc.ubuntu-fr.org/nginx#configuration_du_reverse_proxy_et_du_cache_web)
- configure nginx reverse proxy to listen on [https](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/) with Let's encrypt
- install [mongodb](https://doc.ubuntu-fr.org/mongodb)
- install and run opds-server. it listen on port 3000
- install and run actions-server. it listen on port 4000

## Todo

> Make a configuration shell script


# certbot

sudo docker run -it --rm --name certbot -v "http_certbot:/etc/letsencrypt" -p 80:80 -p 443:443 certbot/certbot certonly
