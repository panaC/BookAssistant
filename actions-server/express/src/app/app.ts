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
import { intentName } from './intent/intent';
import { Session } from './database/session';
import { MediaService } from './service/media.service';
import { UtilsService } from './service/utils.service';
import { RefService } from './service/ref.service';

import { Core } from './core/core';

export class DFConv extends DialogflowConversation<IsessionStorage, IuserStorage> {
  //utils: UtilsService;
  //session: Session;
  //media: MediaService;
  //ref: RefService;
  core: Core;
  init: (conv: DFConv) => string;
}

// Create an app instance
export const app = dialogflow({
  /*debug: true,*/
});

const init = (conv: DFConv) => {
  if (!conv.data.state) {
    conv.data.state = 'start';
    console.log('INIT', conv.data.state);
  }
  return '';
}

// src in actions-server/express/node_modules/actions-on-google/src/service/dialogflow/dialogflow.ts:500
// app.middleware is call at each new request
// save here all my service class
// each call is push data fct into an array
// allow multiple call
app.middleware((conv: DFConv) => {
  // conv.utils = new UtilsService(conv);
  // conv.session = new Session(conv.user.storage.id);
  // await conv.session.waitInit;
  // conv.media = new MediaService(conv);
  // conv.ref = new RefService(conv);
  conv.core = new Core(conv);
  init(conv);
});

app.intent(intentName, (conv: DFConv) => conv.core.main());