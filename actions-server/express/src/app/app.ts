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

import { dialogflow, DialogflowConversation, Contexts } from 'actions-on-google';
import { IsessionStorage, IuserStorage, IuserDataDb, IsessionDataDb } from '../interface/storage.interface';
import { Session } from './../database/session';
import { exec, setLocale } from '../core/core';
import { UserInfo } from './../database/userInfo';
import { DB_URL } from './../constants';
import { start } from './graph/start/start';

const generateUUID = () =>
  Math.random().toString(36).substring(2, 15) + '-' +
  Math.random().toString(36).substring(2, 15) + '-' +
  Math.random().toString(36).substring(2, 15) + '-' +
  Math.random().toString(36).substring(2, 15) + '-' +
  Math.random().toString(36).substring(2, 15) + '-' +
  Math.random().toString(36).substring(2, 15);

export interface DFConv extends DialogflowConversation<IsessionStorage, IuserStorage>{
  // utils: UtilsService;
  session: Session<IsessionDataDb>;
  userInfo: UserInfo<IuserDataDb>;
  // media: MediaService;
  // ref: RefService;
  // init: (conv: DFConv) => string;
}

interface context extends Contexts {
  /* insert here all context in array used in app (in Dialogflow console in input field set the same context write in node*/

};

// Create an app instance
export const app = dialogflow<IsessionStorage, IuserStorage, context, DFConv>({
  /*debug: true,*/
});

// src in actions-server/express/node_modules/actions-on-google/src/service/dialogflow/dialogflow.ts:500
// app.middleware is call at each new request
// save here all my service class
// each call is push data fct into an array
// allow multiple call
app.middleware<DFConv> (async (conv) => {

  // the conv type is set to DialogflowConversation<{}, {}, Contexts> and not allow template Type
  const c = (conv as DFConv);

  if (!c.user.storage.userId) {
    c.user.storage.userId = generateUUID();
  }
  c.userInfo = new UserInfo<IuserDataDb>(c.user.storage.userId, DB_URL);
  await c.userInfo.sync();

  if (!c.data.sessionId) {
    c.data.sessionId = generateUUID();
    UserInfo.update(c.userInfo, c);
  }
  c.session = new Session<IsessionDataDb>(c.data.sessionId, DB_URL, start);
  await c.session.sync();
  Session.update(c.session, c);

  // erase all state that don't belong to sessionId
  // use this for apply memory session in actual session, for the next feature
  // conv.user.storage.id = conv.session.id;
  // conv.media = new MediaService(conv);
  // conv.ref = new RefService(conv);
  setLocale(c.user.locale);
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
app.intent(intentName, async (conv: DFConv) => await exec(conv));