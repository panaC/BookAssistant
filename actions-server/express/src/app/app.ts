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
  *
  * Todo :
  *
  * - Add an interface for sessionStorage
  * - Add an interface for userStorage
  * - Add all the code into a class App (app.ts)
  *           -> Ok create class DFconv that herit from DialogflowConversation and contain utils (all tools handle conversation (ask))
  *             -> set the new file with utils.ts and add a class service for http request
  *   - Add each class method to the right intent in init phase
  *   - Add a service class file (app.service.ts)
  *   - Manage the global app architecture for spliting app.ts in playing_control and ask_feed/webpub and global_intent
  * - Add i18n for each ask sentence
  * - Add a context enum
  * - Change Default welcome Intent by 'start' and set in dialogflow like starting point (like numberGenie)
  * - Set the global context play_audiobook
  * - When the userStorage has already the same audiobook that the user want
  *   - Ask to user if he want starting at last chapter listen it (set the context startingLastChapterListen_YES_NO)
  *     - if yes : play the last chapter by set the sessionStorage and return the fct playing
  *     - if no : set the current chapter to 0 and return the playing fct
  * - Add a fallbackCount in sessionStorage for counting the number of fallback
  *   - when it's equal to 2 -> conv.close and return
  *   - see ln 233 in index.js numberGenie
  * - Add intent (context: 'playing audiobook')
  *   - next_chapter
  *   - previous_chapter
  *   - ask_author
  *   - ask_resume
  *   - ask_numberOfChapter
  *   - ...
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

// default intents
app.intent('no_input', intent.noInput);
app.intent('goodbye', intent.goodbye);
