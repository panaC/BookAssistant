/*
 * File: media.service.ts
 * Project: VoiceAssistant
 * File Created: Thursday, 28th March 2019 2:44:31 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Thursday, 28th March 2019 2:44:53 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { SEARCH } from '../../constants';
import Axios from 'axios';
import { ILinks } from '../../../../../opds-server/src/webpub/interfaces/links.interface';
import { IWebpub } from '../../../../../opds-server/src/webpub/interfaces/webpub.inteface';
import { Eaudiobook } from '../../database/interface/session.interface';
import { DFConv } from '../app';

export const getState = (state: Eaudiobook) => {
  return {
    state,
  };
};

export const getLink = (a: IWebpub) => a.links.filter((ln) => ln.rel === 'audiobook').pop();

export const getImg = (a: IWebpub) => a.resources.filter((ln) => ln.rel === 'cover').pop();

// Middleware Media
// request from app.middleware
// Handle all the media provider
// set the title and author of book
// get and save to session the playing media
export class MediaService {
  constructor(private _conv: DFConv) {
  }

  private _title: string = undefined;
  private _author: string = undefined;
  private _webpub: IWebpub[] = [];
  private _nb: number = 0;
  private _length: number = 0;
  private _state: Eaudiobook = Eaudiobook.OK;

  get webpub(): IWebpub {
    return this._webpub[this._nb];
  }

  set title(t: string) {
    this._title = t;
    this._webpub = [];
    this._nb = 0;
  }

  set author(a: string) {
    this._author = a;
    this._webpub = [];
    this._nb = 0;
  }

  // first step in "I want listen" intent
  // get the length of array from api webpub
  public async length() {
    await this.getWebpub();
    if (this._state === Eaudiobook.OK) {
      return this._webpub.length;
    }
    return 0;
  }

  // second step
  // get and save the selected wepbub
  public async choice(nb: number = 0) {
    if (this._length > nb && nb >= 0) {
      this._nb = nb;
      if (!this._webpub.length) {
        await this.getWebpub();
      }
      this._conv.session.state.currentPlayingMedia = this.media();
      this._conv.session.save();
    }
  }

  // private method for handle media in Iplaying Format
  // generate a play media
  private media() {
    let a = this.webpub;
    let chapter = this._conv.session.state.chapterToPlay;
    let link: ILinks;

    if (chapter >= 0 && chapter < this.webpub.readingOrder.length) {
      if (a.readingOrder && a.readingOrder.length) {
        if (chapter === a.readingOrder.length) {
          return getState(Eaudiobook.END_CHAPTER);
        } else if (chapter > a.readingOrder.length) {
          return getState(Eaudiobook.ERROR_CHAPTER);
        }
        link = a.readingOrder[chapter];
      } else {
        if (chapter > 0) {
          return getState(Eaudiobook.END_CHAPTER);
        } else if (!(link = getLink(a))) {
          return getState(Eaudiobook.NOT_FOUND);
        }
      }
      const img = getImg(a);
      return {
        state: Eaudiobook.OK,
        name: a.metadata.title,
        url: link.href,
        description: a.metadata.identifier,
        identifier: a.metadata.identifier,
        author: a.metadata.author,
        img: (img) ? {
          url: img.href,
          alt: img.title,
        } : null,
        chapter,
        numberOfChapter: (a.readingOrder.length || 1),
        webpub: this.webpub,
      };
    }
    return getState(this._state);
  }

  // private method
  // get webpub[] by http request to API webpub
  private async getWebpub(title: string = undefined, author: string = undefined) {
    const res = await Axios.get<IWebpub[]>(SEARCH(title || this._title, author || this._author));
    if (res && res.data && !res.data.length) {
      this._state = Eaudiobook.NOT_FOUND;
    } else if (!res || !res.data) {
      this._state = Eaudiobook.ERROR_AXIOS;
    }
    this._state = Eaudiobook.OK;
    this._webpub = res.data;
  }
}

