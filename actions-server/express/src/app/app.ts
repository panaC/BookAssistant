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

import { IDFConv } from './../core/';
import { dialogflow, Contexts } from 'actions-on-google';
import { TmiddlewareFactory } from './middleware';
import { IintentTable, InodeTable } from './interface';
import { join } from 'path';
import { generateUUID } from '../core/utils/generateuuid';
import { IsessionStorage, IuserStorage } from './../core';
import { START_DEFAULT_INTENT } from './table/intentTable';
import { Inode } from '../core/middleware/graph';


// used only for template typing dialogflow
// actions-server/express/node_modules/actions-on-google/src/service/dialogflow/context.ts:184
// extends [:string]: Context
// used this only to set context name keyof of Tcontext
// but doesn't work with the iterator type employ
interface ImyContextInterface extends Contexts { }

export const appFactory = (intentTable: IintentTable, middlewareFactory: TmiddlewareFactory) => {

  /**
   * Create a DialogFlow app instance
   * See actions-on-google Modules -> Dialogflow/dialogflow.ts
   */
  const app = dialogflow<IsessionStorage, IuserStorage, ImyContextInterface, IDFConv>({
    /*debug: true,*/
  });

  /**
   * Middleware
   */
  //app.middleware<IDFConv>(async (conv) =>
  //  Object.assign<IDFConv, Imiddleware>(conv as IDFConv, await middlewareFactory(conv as IDFConv)));
  app.middleware<IDFConv>(async (conv) => {
    
    let newSession = false;
    let lostUserMemory = false;
    let lostSessionMemory = false;

    // user persistence storage
    if (!(conv as IDFConv).user.storage.userId) {
      if (conv.intent !== START_DEFAULT_INTENT) {
        lostUserMemory = true;
      }
      (conv as IDFConv).user.storage.userId = generateUUID();
    }
    // session persistence storage
    if (!(conv as IDFConv).data.sessionId) {
      if (conv.intent !== START_DEFAULT_INTENT) {
        lostSessionMemory = true;
      }
      (conv as IDFConv).data.sessionId = generateUUID();
      newSession = true;
    }

    // middleware
    (conv as IDFConv).middleware = await middlewareFactory(conv as IDFConv);
    (conv as IDFConv).middleware.i18n.configure({
      directory: join(__dirname, '../locales'),
      objectNotation: true,
      fallbacks: {
        'fr-FR': 'fr',
        'fr-CA': 'fr',
        'en-US': 'en',
        'en-GB': 'en',
      },
      defaultLocale: 'fr',
    });
    (conv as IDFConv).middleware.i18n.setLocale(conv.user.locale);
    if (newSession) {
      (conv as IDFConv).middleware.db.user.update(conv as IDFConv);
    }
    (conv as IDFConv).middleware.db.user.lostMemory = lostUserMemory;
    (conv as IDFConv).middleware.db.session.lostMemory = lostSessionMemory;
  });

  /**
   * Intent declaration
   * Starting point for all incoming intent
   */
  app.intent(Object.keys(intentTable), async (conv) => {
    const getNodeInIntentTable = (conv: IDFConv, name: keyof IintentTable) =>
      conv.middleware.getValueWithStringKey<IintentTable, Inode>(
        conv.middleware.table.intentTable(),
        name, conv.middleware.table.intentTable().fallback);

    conv.node = getNodeInIntentTable(conv, conv.intent as keyof IintentTable);
    return await conv.middleware.graph(conv);
  });

  return app;
};

// EOF