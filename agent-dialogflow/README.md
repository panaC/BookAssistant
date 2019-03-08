
## agent-dialogflow

backup agent configuration from [dialogflow console](https://console.dialogflow.com/) by dialogflow [API](https://cloud.google.com/dialogflow-enterprise/docs/reference/rest/v2-overview).


## what's included

```
.
├── agent : Actual agent in dialogflow.com for this application, unzip it
├── agent.zip : the same agent that upside folder, use for push configuration in dialogflow project
├── README.md
└── script : the code for extract agent from dialogflow
```

## Getting started

```sh
cd script
npm install

# For backup
npm run agent
```