FROM node:10-stretch

WORKDIR /app

COPY . /app

RUN apt-get update && \
    apt-get install git -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV PORT_OPDS_SERVER 3000
ENV NAME_OPDS_SERVER 'OPDS2-server on Docker'
ENV DOMAIN_OPDS_SERVER 'edrlab.ml'
ENV PROTOCOL_OPDS_SERVER 'https'
ENV ROOT_OPDS_SERVER 'api'
ENV MONGODB_URI 'mongodb://mongo:27017'
ENV NODE_ENV ${NODE_ENV:-production}

EXPOSE ${PORT_OPDS_SERVER}

# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#entrypoint
ENTRYPOINT [ "/bin/bash", "docker/entrypoint.sh" ]
CMD [ "npm", "run", "start:prod" ]