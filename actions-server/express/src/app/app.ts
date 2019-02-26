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

 /*
  * Ressources :
  *
  * app.intent doc : https://github.com/actions-on-google/actions-on-google-nodejs/blob/master/src/service/dialogflow/conv.ts
  */

import { dialogflow, Image, MediaObject, Suggestions, DialogflowConversation } from 'actions-on-google';
import Axios from 'axios';
import { OpdsDto } from './../../../../opds-server/src/webpub/opds/dto/opds.dto';
import { IWebpub } from './../../../../opds-server/src/webpub/interfaces/webpub.inteface';
import { SEARCH, SERVER_URL } from './../constants';
import { ILinks } from '../../../../opds-server/src/webpub/interfaces/links.interface';

interface IsessionStorage {
  feed: OpdsDto;
  currentWebpub: IWebpub;
  currentChapter: number;
  currentName: string;
}

// Create an app instance
export const app = dialogflow({
  /*debug: true,*/
});

// Register handlers for Dialogflow intents
app.intent('Default Welcome Intent', async (conv: DialogflowConversation<IsessionStorage>) => {
  conv.data.currentChapter = 0;
  try {
    const res = await Axios.get(SERVER_URL);
    if (res.data) {
      // the payload feed is to heavy for a local storage
      // In this case : the simulator crash and quit l'app silently without seeing it
      // conv.data.feed = res.data;
    }
  } catch (e) {
    //
  }
  conv.ask(`Que voulez-vous écouter ?`);
});

app.intent('play audiobook', async (conv: DialogflowConversation<IsessionStorage>, { audiobook }) => {

  if (!conv.surface.capabilities.has('actions.capability.MEDIA_RESPONSE_AUDIO')) {
    conv.ask('Désolé, cet appareil ne supporte pas la lecture audio');
    return;
  }
  try {
    let a: IWebpub;
    let link: ILinks;
    conv.data.currentName = audiobook as string;

    const res = await Axios.get(SEARCH(conv.data.currentName));
    if (res.data[0]) {
      conv.data.currentWebpub = res.data[0];
      a = res.data[0];
    } else {
      throw new Error('Opds Webpub Manifest Not Found');
    }

    if (a.readingOrder && a.readingOrder.length && conv.data.currentChapter < a.readingOrder.length) {
      link = a.readingOrder[conv.data.currentChapter++];
    } else {
      link = a.links.filter((ln) => ln.rel === 'audiobook').pop();
    }

    const img = a.resources.filter((ln) => ln.rel === 'cover').pop();

    conv.ask(`Voici l'audiobook ${audiobook}`);
    conv.ask(new MediaObject({
      name: a.metadata.title,
      url: link.href,
      description: a.metadata.identifier,
      icon: (img) ? new Image({
        url: img.href,
        alt: img.title,
      }) : null,
    }));
    conv.ask(new Suggestions('Ma suggestion'));

  } catch (e) {
    conv.ask(`Une erreur est survenue ${e}`);
  }
});

app.intent('media status', (conv: DialogflowConversation<IsessionStorage>) => {

  const a = conv.data.currentWebpub;
  if (a && a.readingOrder && a.readingOrder.length && conv.data.currentChapter < a.readingOrder.length) {
    try {
      const img = a.resources.filter((ln) => ln.rel === 'cover').pop();
      const link = a.readingOrder[conv.data.currentChapter++];

      conv.ask(`Voici l'audiobook ${conv.data.currentName}`);
      conv.ask(new MediaObject({
        name: a.metadata.title,
        url: link.href,
        description: a.metadata.identifier,
        icon: (img) ? new Image({
          url: img.href,
          alt: img.title,
        }) : null,
      }));
      conv.ask(new Suggestions('Ma suggestion'));

    } catch (e) {
      conv.ask(e);
    }
  }
  conv.ask(`l'audiobook ${conv.data.currentName} est finis`);
});

// Intent in Dialogflow called `Goodbye`
app.intent('Goodbye', conv => {
  conv.close('Reviens vite !');
});

app.intent('Default Fallback Intent', conv => {
  conv.ask(`Je n'ai pas compris peux tu me demander autre chose ?`);
});
