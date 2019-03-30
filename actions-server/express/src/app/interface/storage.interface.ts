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

import { Eaudiobook } from '../database/interface/session.interface';

/*
** RM session storage replace by couchdb
export interface IsessionStorage {
  currentPlayingMedia: IplayingMedia;
  chapterToPlay: number;
  // tellByUser :
  titleTellByUser: string;
  // author
  // ref
  // yes-no
  // choice-number
  //
  // don't forget to errase
}
*/

export interface IsessionStorage {
  // empty
}

export interface IplayingMedia {
  state: Eaudiobook;
  name?: string;
  url?: string;
  description?: string;
  author?: string;
  identifier?: string;
  img?: {
    url: string,
    alt: string,
  };
  chapter?: number;
  numberOfChapter?: number;
}

//
// Save only userId generate by couchdb to get back user information
export interface IuserStorage {
  id: string;
}

/*
export interface IuserStorage {
  mediaIdentifier: ImediaId;
  lastSeen: Date;
}
*/
