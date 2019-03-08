
# opds-server

an API server that handle web request and provide opds standard audiobook

## what's included

```
src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── constants.ts
├── database :=> Mongodb initialisation
│   ├── database.module.ts
│   └── database.providers.ts
├── main.ts :=> Server start
├── pipe :=> Validation pipe for webpub format request on post
│   └── validation.pipe.ts
└── webpub :=> webpub main HTTP app route
    ├── dto :=> data transfert object for webpub format
    │   ├── links.dto.ts
    │   ├── metadata.dto.ts
    │   └── webpub.dto.ts
    ├── interfaces :=> interface type for webpub format
    │   ├── links.interface.ts
    │   ├── metadata.interface.ts
    │   └── webpub.inteface.ts
    ├── opds :=> dto for opds format
    │   ├── dto
    │   │   ├── metadataOpds.dto.ts
    │   │   └── opds.dto.ts
    │   └── feed.service.ts :=> opds formating in get
    ├── schema :=> mongodb schema to save all webpub data
    │   ├── links.schema.ts
    │   ├── metadata.schema.ts
    │   └── webpub.schema.ts
    ├── webpub.controller.spec.ts
    ├── webpub.controller.ts :=> Model controller in MVC with CRUD operation
    ├── webpub.module.ts :=> Nest.js Module
    ├── webpub.providers.ts :=> Mongodb provider
    ├── webpub.service.spec.ts
    └── webpub.service.ts :=> call by controller for provide output data context in webpub or opds format
```

## Description

Built with [Nest](https://github.com/nestjs/nest) framework TypeScript

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support Nest.js

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

