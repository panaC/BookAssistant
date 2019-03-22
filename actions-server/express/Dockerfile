FROM node:10-stretch

WORKDIR /app

COPY . /app

ENV PORT_ACTIONS_SERVER 4000
ENV NAME_ACTIONS_SERVER 'Actions-server on Docker'
ENV PROTOCOL_OPDS_SERVER 'http://opds-server:3000/webpub'
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}

EXPOSE ${PORT_ACTIONS_SERVER}

# in NODE_ENV = production : npm install only dependencies
RUN [ "npm", "install" ]

# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#entrypoint
ENTRYPOINT [ "/bin/bash", "docker/entrypoint.sh" ]


# To build this dockerfile :
# docker build --tag=actions-server --build-arg NODE_ENV=development .