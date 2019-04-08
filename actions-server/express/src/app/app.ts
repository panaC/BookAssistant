import { cancel, error, fallback } from './graph/graph';
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
import { Isymbol } from '../interface/symbol.interface';
import { Iintent } from '../interface/intent.interface';
import { Inode } from '../interface/node.interface';
import { startChoice, startName, startAge } from './graph/start/children';
import { noInput } from './graph/graph';

//
// overloading DialogflowConversation to add both user and session database access on couchdb
export interface DFConv extends DialogflowConversation<IsessionStorage, IuserStorage> {
  session: Session<IsessionDataDb>;
  userInfo: UserInfo<IuserDataDb>;
  node: Inode;
}

//
// saved all context used in app here
// in Dialogflow pick a incomming context only if it appears in it.
// See actions-on-google Modules -> Dialogflow/context.ts
export interface contextTable /*extends Contexts*/ {
};

export interface IsymbolTable {
  start: Inode;
  startChoice: Inode;
  startName: Inode;
  startAge: Inode;
  noInput: Inode;
  cancel: Inode;
  error: Inode;

  // require
  fallback: Inode;
}

const nodeTable: IsymbolTable = {
  start: start,
  startChoice: startChoice,
  startName: startName,
  startAge: startAge,
  noInput: noInput,
  cancel: cancel,
  fallback: fallback,
  error: error,
}

export interface IintentTable {
  'start': Inode;
  'start.age': Inode;
  'start.name': Inode,
  'fallback': Inode,
  'no_input': Inode,
  'cancel': Inode,
}

const intentTable: IintentTable = {
  'start': start,
  'start.age': start,
  'start.name': start,
  'fallback': start,
  'no_input': start,
  'cancel': start,
}

export const getNodeInSymbolTable = (name: keyof IsymbolTable) =>
  Object.entries(nodeTable).reduce((p, o) => {
    const [key, node] = o;
    if (key === name) {
      return node;
    }
    return p;
  }, intentTable.fallback)

// used only for template typing dialogflow
// actions-server/express/node_modules/actions-on-google/src/service/dialogflow/context.ts:184
// extends [:string]: Context
// used this only to set context name keyof of Tcontext
// but doesn't work with the iterator type employ
interface myContextInterface extends Contexts { }

// Create an app instance
// See actions-on-google Modules -> Dialogflow/dialogflow.ts
export const app = dialogflow<IsessionStorage, IuserStorage, myContextInterface, DFConv>({
  /*debug: true,*/
});

//
// app.middleware is call at each new request
// each call is push data fct into an array
// allow multiple call
// See actions-server/express/node_modules/actions-on-google/src/service/dialogflow/dialogflow.ts:500
app.middleware<DFConv>(async (conv) => {

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
  c.session = new Session<IsessionDataDb>(c.data.sessionId, DB_URL);
  await c.session.sync();
  Session.update(c.session, c);

  setLocale(c.user.locale);
});

const getNodeInIntentTable = (name: keyof IintentTable) =>
  Object.entries(intentTable).reduce((p, o) => {
    const [key, node] = o;
    if (key === name) {
      return node;
    }
    return p;
  }, intentTable.fallback)

//
// Starting point for all incoming intent
// start exec with Inode in intentName
app.intent(Object.keys(intentTable), async (conv: DFConv) => {
  conv.node = getNodeInIntentTable(conv.intent as keyof IintentTable);
  return await exec(conv);
});

// EOF