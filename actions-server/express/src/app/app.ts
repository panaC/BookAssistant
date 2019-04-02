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
import { IsessionStorage, IuserStorage } from '../interface/storage.interface';
import { Session } from './database/session';
import { Core, setLocale } from '../core/core';

const generateUUID = () =>
  Math.random().toString(36).substring(2, 15) + '-' +
  Math.random().toString(36).substring(2, 15) + '-' +
  Math.random().toString(36).substring(2, 15) + '-' +
  Math.random().toString(36).substring(2, 15) + '-' +
  Math.random().toString(36).substring(2, 15) + '-' +
  Math.random().toString(36).substring(2, 15);

export class DFConv extends DialogflowConversation<IsessionStorage, IuserStorage> {
  // utils: UtilsService;
  session: Session;
  // media: MediaService;
  // ref: RefService;
  core: Core;
  // init: (conv: DFConv) => string;
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
app.middleware(async (conv: DFConv) => {
  // conv.utils = new UtilsService(conv);
  if (!conv.user.storage.userId) {
    conv.user.storage.userId = generateUUID();
  }
  if (!conv.data.sessionId) {
    conv.data.sessionId = generateUUID();
  }
  conv.session = new Session(
      conv.user.storage.userId
    , conv.data.sessionId
    , conv.user.locale);
  await conv.session.waitInit;
  // erase all state that don't belong to sessionId
  // use this for apply memory session in actual session, for the next feature
  // conv.user.storage.id = conv.session.id;
  // conv.media = new MediaService(conv);
  // conv.ref = new RefService(conv);
  conv.core = new Core(conv);
  setLocale(conv.user.locale);
});

const intentName = [
  'start',
  'start.age',
  'start.name',
  'fallback',
  'no_input',
  'cancel',
];

// extract intentName from state.ts
// futur feature
// must be specified in json
app.intent(intentName, async (conv: DFConv) => await conv.core.main());