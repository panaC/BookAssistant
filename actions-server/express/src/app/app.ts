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
  *
  */

import { dialogflow, DialogflowConversation } from 'actions-on-google';
import { IsessionStorage, IuserStorage } from './interface/storage.interface';
import { Utils } from './utils';
import { intent } from './intent/intent';

export class DFConv extends DialogflowConversation<IsessionStorage, IuserStorage> {
  utils: Utils;
}

// Create an app instance
export const app = dialogflow({
  /*debug: true,*/
});


// src in actions-server/express/node_modules/actions-on-google/src/service/dialogflow/dialogflow.ts:500
// app.middleware is call at each new request
// save here all my service class
// each call is push data fct into an array
// allow multiple call
app.middleware((conv: DFConv) => {
  conv.utils = new Utils(conv);
});

// start intents
app.intent('Default Welcome Intent', intent.welcome);

// play intents
app.intent('play_audiobook', intent.play);
app.intent('play_audiobook-media_status', intent.playNext);
app.intent('play_audiobook-repeat', intent.play);
app.intent('play_audiobook-next', intent.playNext);
app.intent('play_audiobook-previous', intent.playPrev);
app.intent('play_audiobook-yes', intent.play);
app.intent('play_audiobook-no', intent.playNo);
app.intent('play_audiobook-reference', intent.playReference);
app.intent('play_audiobook-numberOfChapter', intent.numberOfChapter);
app.intent('play_audiobook-chapter', intent.currentChapter);
app.intent('play_audiobook-author', intent.author);

// default intents
app.intent('no_input', intent.noInput);
app.intent('goodbye', intent.goodbye);
