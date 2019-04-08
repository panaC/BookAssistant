/*
 * File: session.interface.ts
 * Project: VoiceAssistant
 * File Created: Wednesday, 3rd April 2019 9:58:07 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Wednesday, 3rd April 2019 9:58:10 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

// import { IWebpub } from './../../../../../../opds-server/src/webpub/interfaces/webpub.inteface';
import { Capabilities } from 'actions-on-google/dist/service/actionssdk';
import * as Nano from 'nano';
import { Inode } from '../../interface/node.interface';

/*
export enum Eaudiobook {
  ERROR_AXIOS = 'error.audiobook.network',
  END_CHAPTER = 'play.finish',
  ERROR_CHAPTER = 'error.audiobook.chapter',
  NOT_FOUND = 'error.audiobook.not_found',
  ERROR_REF = 'error.audiobook.ref',
  OK = 'ok',
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
  webpub?: IWebpub;
}

export interface Istate {
  lastSeen: Date;
  state: string;
  bookAvailable: [{
    title: string,
    author: string,
    identifier: string,
  }];
  currentPlayingMedia: IplayingMedia;
  chapterToPlay: number;
  choice?: number;
  yes_no?: boolean;
}
*/

export interface IrawInput {
  date: Date;
  query: string;
}

export interface Isession extends Nano.MaybeDocument {
  lastSeen: Date;
  surfaceCapabilities?: Capabilities;
  raw: IrawInput[];
  
  // no longer used since intentName contains node instead global session state
  //state: string;
  data: {};
}
