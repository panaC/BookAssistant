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

 /**
  * - This file is the main entry for launch the dialogflow app.
  * - At each http post request express routing to dialogflow middleware
  *    and return data into http response request.
  * - At each request: app.middleware is call first then app.intent.
  * - Conv object follow all way request function and at the end
  *    dialogflow serialize and submit to express the json to send back
  * 
  * Ressources :
  *
  * - app.intent src : https://github.com/actions-on-google/actions-on-google-nodejs/blob/master/src/service/dialogflow/conv.ts
  *
  */

import { dialogflow, DialogflowConversation, Contexts } from 'actions-on-google';
import { IsessionStorage, IuserStorage, IuserDataDb, IsessionDataDb } from '../interface/storage.interface';
import { Session } from './../database/session';
import { exec, setLocale } from '../core/core';
import { UserInfo } from './../database/userInfo';
import { DB_URL, INTENT_START_NAME } from './../constants';
import { start } from './graph/start/start';
import { generateUUID } from './../utils/generateuuid';

//
// overloading DialogflowConversation to add both user and session database access on couchdb
export interface DFConv extends DialogflowConversation<IsessionStorage, IuserStorage>{
  session: Session<IsessionDataDb>;
  userInfo: UserInfo<IuserDataDb>;
}

//
// saved all context used in app here
// in Dialogflow pick a incomming context only if it appears in it.
// See actions-on-google Modules -> Dialogflow/context.ts
interface context extends Contexts {
  /* insert here all context in array used in app (in Dialogflow console in input field set the same context write in node*/

};

//
// Create an app instance
// See actions-on-google Modules -> Dialogflow/dialogflow.ts
export const app = dialogflow<IsessionStorage, IuserStorage, context, DFConv>({
  /*debug: true,*/
});

//
// app.middleware is call at each new request
// each call is push data fct into an array
// allow multiple call
// See actions-server/express/node_modules/actions-on-google/src/service/dialogflow/dialogflow.ts:500
app.middleware<DFConv> (async (conv) => {

  // the conv type is set to DialogflowConversation<{}, {}, Contexts> and not allow template Type
  const c = (conv as DFConv);

  // user persistence storage
  if (!c.user.storage.userId) {
    if (c.intent !== INTENT_START_NAME) {
      // error google assistant
      // data session lost his memory during user session
      // what we can do here ?
    }
    c.user.storage.userId = generateUUID();
  }
  c.userInfo = new UserInfo<IuserDataDb>(c.user.storage.userId, DB_URL);
  await c.userInfo.sync();

  // session persistence storage
  if (!c.data.sessionId) {
    if (c.intent !== INTENT_START_NAME) {
      // error google assistant
      // data session lost his memory during user session
      // what we can do here ?
    }
    c.data.sessionId = generateUUID();
    UserInfo.update(c.userInfo, c);
  }
  c.session = new Session<IsessionDataDb>(c.data.sessionId, DB_URL, start);
  await c.session.sync();
  Session.update(c.session, c);

  setLocale(c.user.locale);
});

//
// fill all intent used in app in it
const intentName = [
  INTENT_START_NAME,
  'start.age',
  'start.name',
  'fallback',
  'no_input',
  'cancel',
];

//
// Starting point for all incoming intent
app.intent(intentName, async (conv: DFConv) => {
  await exec(conv);
  await conv.session.save();
  await conv.userInfo.save();
});

// EOF