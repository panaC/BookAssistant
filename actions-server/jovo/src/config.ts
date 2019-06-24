// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

const config = {
    logging: true,

    intentMap: {
        'AMAZON.NextIntent': 'NextIntent',
        'AMAZON.PreviousIntent': 'PreviousIntent',
        'AMAZON.ResumeIntent': 'ResumeIntent',
        'AMAZON.HelpIntent': 'HelpIntent',
    },

    intentsToSkipUnhandled: [
        'END',
    ],

    i18n: {
        returnObjects: true,
        fallbackLng: 'en-US',
        ressources: {
            'en-US': require('./i18n/en-US.json'),
            'fr-FR': require('./i18n/fr-FR.json'),
            'fr-CA':  require('./i18n/fr-FR.json'),
        },
    },

    db: {
        FileDb: {
            pathToFile: './../db/db.json',
        },
    },
};
export = config;
