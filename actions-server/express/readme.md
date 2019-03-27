
# actions-server with Express

local hosting instead firebase

## what's included

```
src
├── app :=> app parse and react to the Dialogflow agent's webhook
│   ├── app.ts :=> main intent declaration
│   ├── intent :=> intent handle fct
│   │   ├── default.intent.ts
│   │   ├── intent.ts :=> export all intent
│   │   ├── playInfo.intent.ts
│   │   ├── play.intent.ts
│   │   └── welcome.intent.ts
│   ├── interface :=> typescript interface type
│   │   └── storage.interface.ts
│   ├── locales :=> i18n internationalisation
│   │   ├── en.json
│   │   └── fr.json
│   ├── prompt.ts :=> prompt display sentence with i18n
│   ├── service :=> handle Webpub by API call
│   │   └── audiobook.service.ts
│   └── utils.ts :=> i18n loading and utils fct
├── constants.ts :=> config file
├── main.ts
└── server.ts :=> express configuration
```

## Getting started with actions-server

```
npm install
npm run start
```

then, configure NGINX to an HTTPS server with reverse proxy. see `/docs/server.md`

## Run test

```
npm t
```
