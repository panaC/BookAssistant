/*
 * File: app.ts
 * Project: VoiceAssistant
 * File Created: Wednesday, 6th February 2019 11:27:59 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Wednesday, 6th February 2019 11:28:17 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { dialogflow, Image, MediaObject, Suggestions } from 'actions-on-google';

// Create an app instance
export const app = dialogflow();

// Register handlers for Dialogflow intents
app.intent('Default Welcome Intent', conv => {
  conv.ask(`Une musique Jazz :`);
  /*conv.ask(new Image({
    url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
    alt: 'Un chat',
  }));*/
  if (!conv.surface.capabilities.has('actions.capability.MEDIA_RESPONSE_AUDIO')) {
    conv.ask('Désolé, cet appareil ne supporte pas la lecture audio');
    return;
  }
  conv.ask(new MediaObject({
    name: 'Jazz à Paris',
    url: 'https://storage.googleapis.com/automotive-media/Jazz_In_Paris.mp3#t=20',
    description: 'Un morceau de Jazz',
    icon: new Image({
      url: 'https://storage.googleapis.com/automotive-media/album_art.jpg',
      alt: 'Jazz musique',
    }),
  }));
  conv.ask(new Suggestions('fermée'));
});

// Intent in Dialogflow called `Goodbye`
app.intent('Goodbye', conv => {
  conv.close('Reviens vite !');
});

app.intent('Default Fallback Intent', conv => {
  conv.ask(`Je n'ai pas compris peux tu me demandé autre chose ?`);
});
