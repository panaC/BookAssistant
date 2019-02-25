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
import Axios from 'axios';

// Create an app instance
export const app = dialogflow({
  debug: true,
});

// Register handlers for Dialogflow intents
app.intent('Default Welcome Intent', conv => {
  conv.ask(`Que voulez-vous écouter ?`);
});

app.intent('play audiobook', async (conv, { audiobook }) => {
  conv.ask(`Voici l'audiobook ${audiobook}`);
  if (!conv.surface.capabilities.has('actions.capability.MEDIA_RESPONSE_AUDIO')) {
    conv.ask('Désolé, cet appareil ne supporte pas la lecture audio');
    return;
  }
  try {
    const res = await Axios.get(`https://edrlab.ml/api?q=${encodeURI(audiobook as string)}`);
    if (res.data[0].links[0].href) {
      conv.ask(new MediaObject({
        name: res.data[0].metadata.title,
        url: res.data[0].links[0].href,
        description: res.data[0].metadata.identifier,
        icon: new Image({
          url: 'https://storage.googleapis.com/automotive-media/album_art.jpg',
          alt: 'Jazz musique',
        }),
      }));
      conv.ask(new Suggestions('Ma suggestion'));
    }
  } catch (e) {
    conv.ask(`Une érreur est survenue : ${e}`);
  }
});

// Intent in Dialogflow called `Goodbye`
app.intent('Goodbye', conv => {
  conv.close('Reviens vite !');
});

app.intent('Default Fallback Intent', conv => {
  conv.ask(`Je n'ai pas compris peux tu me demander autre chose ?`);
});
