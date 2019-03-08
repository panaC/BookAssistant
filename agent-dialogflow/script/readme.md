# dialogflow API integration

## Creation of an agent and several intents for VoiceAssistant Actions APP with Google cloud API

Instead used https://console.dialogflow.com, we can create an agent and intents with API by node-js Module 'dialogflow'.

An API limitation exist, see https://cloud.google.com/dialogflow-enterprise/docs/editions

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

## Setup

### An JSON file credential is needed to use [AgentsClient](https://cloud.google.com/nodejs/docs/reference/dialogflow/0.8.x/v2.AgentsClient#AgentsClient) class

- Follow these step : https://dialogflow.com/docs/reference/v2-auth-setup or https://cloud.google.com/docs/authentication/getting-started
- ~~Get back the json file and saved it under a secured directory (no other download is allowed)~~
- ~~In `constants.ts` file change the path of the json file~~
- export the path of downloaded file in ```export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/[FILE_NAME].json"```

### Install

```npm run install```

It used the [diagflow](https://www.npmjs.com/package/dialogflow) module

## Backup

in `agent-dialogflow/src`

```
npm run agent
```

## Diagflow

> todo : The Type ts file *.d.ts is not exhaustive: I may complete it.