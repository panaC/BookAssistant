FROM node:10-stretch

WORKDIR /app

COPY . /app

ENV PORT_OPDS_SERVER 3000
ENV NAME_OPDS_SERVER 'OPDS2-server on Docker'
ENV DOMAIN_OPDS_SERVER 'edrlab.ml'
ENV PROTOCOL_OPDS_SERVER 'https'
ENV ROOT_OPDS_SERVER 'api'
ENV MONGODB_URI 'mongodb://mongo:27017/webpub'
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}

EXPOSE ${PORT_OPDS_SERVER}

# in NODE_ENV = production : npm install only dependencies
RUN [ "npm", "install" ]

# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#entrypoint
ENTRYPOINT [ "/bin/bash", "docker/entrypoint.sh" ]

# doesn't work if maybe entrypoint exit 0 : no error
#CMD [ "npm", "run", "start:prod" ]