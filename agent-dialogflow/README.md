
## agent-dialogflow

backup agent configuration from [dialogflow console](https://console.dialogflow.com/) by dialogflow [API](https://cloud.google.com/dialogflow-enterprise/docs/reference/rest/v2-overview).


## what's included

```
script/src
├── backup.ts => call to api for backup agent to `agent` folder
├── constants.ts
├── debug.ts
├── types
│   └── dialogflow.d.ts
└── unzip.sh => unzip backup zip file to agent call by npm after backup
```

## Getting started

```sh
cd script
npm install

# For backup
npm run agent
```