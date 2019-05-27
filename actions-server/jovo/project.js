// ------------------------------------------------------------------
// JOVO PROJECT CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    alexaSkill: {
        nlu: 'alexa',
        manifest: {
            apis: {
                custom: {
                    interfaces: [
                        {
                            type: 'AUDIO_PLAYER',
                        },
                    ],
                },
            },
        },
    },
    googleAction: {
        nlu: 'dialogflow',
        dialogflow: {
            projectId: 'jovo-7c074',
            keyFile: './dialogflow.credential.json'
        }

    },
    endpoint: '${JOVO_WEBHOOK_URL}',
};
