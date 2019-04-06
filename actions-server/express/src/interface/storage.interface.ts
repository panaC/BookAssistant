/*
 * File: storage.interface.ts
 * Project: VoiceAssistant
 * File Created: Saturday, 30th March 2019 10:57:43 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Saturday, 30th March 2019 10:57:49 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

// save sessionId for couchdb
// https://github.com/actions-on-google/actions-on-google-nodejs/issues/256
export interface IsessionStorage {
  sessionId: string;
}

export interface IsessionDataDb {

}

// Save only userId for couchdb to get back user information
// https://developers.google.com/actions/assistant/save-data#save_data_across_conversations
export interface IuserStorage {
  userId: string;
}

export interface IuserDataDb {
  test: string;
}
