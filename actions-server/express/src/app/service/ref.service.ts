/*
 * File: ref.service.ts
 * Project: VoiceAssistant
 * File Created: Thursday, 28th March 2019 7:12:43 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Thursday, 28th March 2019 3:24:20 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { DFConv } from '../app';
import { REF } from './../../constants';
import Axios from 'axios';
import { ILinks } from './../../../../../opds-server/src/webpub/interfaces/links.interface';
import { getState } from './media.service';
import { Eaudiobook } from '../../database/interface/session.interface';

export const getChapterWithHref = (readingOrder: ILinks[], href: string) =>
  readingOrder.map((link) => link.href === href.split('#')[0]).findIndex((value) => value);

export const searchHrefWithRef = (toc: ILinks[], ref: string): string => 
  toc.map((link) => 
    link.title === ref ? link.href :
      (link.children ? searchHrefWithRef(link.children, ref) : null))
    .reduce((a, c) => c, null);


// Middleware service
// request from app.middleware
// return media Iplaying with ref
export class RefService {
  constructor(private _conv: DFConv) {
  }

  private _ref: string = undefined;
  private _length: number = 0;
  private _data: string[] = [];
  private _nb: number = 0;
  private _state: Eaudiobook = Eaudiobook.OK;

  get ref() {
    return this._ref[this._nb];
  }

  set ref(ref: string) {
    this._ref = ref;
    this._data = [];
    this._nb = 0;
  }

  // first step in "ref" intent
  // get the length of array from api webpub ref
  public async length() {
    await this.getRef();
    if (this._state === Eaudiobook.OK) {
      return this._ref.length;
    }
    return 0;
  }


  // private method
  // get webpub[] by http request to API webpub
  private async getRef() {
    const id = this._conv.session.state.currentPlayingMedia.webpub.metadata.identifier;
    const res = await Axios.get<{state: boolean; ref: string[]}>(REF(id, this._ref));
    if (res && res.data && !res.data.state) {
      this._state = Eaudiobook.ERROR_REF;
    } else if (!res || !res.data) {
      this._state = Eaudiobook.ERROR_AXIOS;
    }
    this._state = Eaudiobook.OK;
    this._data = res.data.ref;
  }

  // second step
  // get and save the selected wepbub
  public async choice(nb: number = 0) {
    if (this._length > nb && nb >= 0) {
      this._nb = nb;
      if (!this._data.length) {
        await this.getRef();
      }
      this._conv.session.state.currentPlayingMedia = await this.mediaRef();
      await this._conv.session.save();
    }
  }

  private async mediaRef() {
    const toc = this._conv.session.state.currentPlayingMedia.webpub.toc;
    const ro = this._conv.session.state.currentPlayingMedia.webpub.readingOrder;
    let link: string;
    let chapter: number;

    if (this._state) {
      if ((link = searchHrefWithRef(toc, this.ref))) {
        if ((chapter = getChapterWithHref(ro, link)) > -1) {
          this._conv.session.state.chapterToPlay = chapter;
          const media = await this._conv.media.media();
          media.url = `${media.url}#${link.split('#')[1]}`;
          return media;
        }
      }
    }
    return getState(Eaudiobook.ERROR_REF);
  }
}

/*


export const getReference = async (identifier: string, ref: string): Promise<string[]> => {
  const res = await Axios.get(REF(identifier, ref));
  if (res && res.data && res.data.ref) {
    return res.data.ref;
  }
  return null;
}

export const getMediaReference = async (
  a: IplayingMedia
  , reference: string
  , nb: number = 0) => {
  let link: string;
  let chapter: number;
  let state: {
    state: Eaudiobook;
  }
  let ref: string[];

  if (a && a.state === Eaudiobook.OK) {
    if ((ref = await getReference(a.identifier, reference)) && ref.length > nb) {
      if ((link = searchHrefWithRef(a.toc, ref[nb]))) {
        if ((chapter = getChapterWithHref(a.readingOrder, link)) > -1) {
          const media = await getMedia(name, chapter);
          media.url = `${media.url}#${link.split('#')[1]}`;
          return media;
        }
      }
    }
    return getState(Eaudiobook.ERROR_REF);
  }
  return state;
}
*/
