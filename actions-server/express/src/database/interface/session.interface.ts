import { IWebpub } from "../../../../../opds-server/src/webpub/interfaces/webpub.inteface";
import { Capabilities } from "actions-on-google/dist/service/actionssdk";
import * as Nano  from 'nano'

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
}

export interface Istate {
  webpub: IWebpub;
  state: number;
  playingMedia: IplayingMedia;
  choice: number;
  yes_no: boolean;
}

interface IrawInput {
  date: Date;
  query: string;
}

interface ImediaId {
  [identifier: string]: number;
}

export interface Ihistoric {
  date: Date;
  input: IrawInput[];
  surfaceCapabilities: Capabilities;
  media: ImediaId;
}

export interface Iuser {
  name: string;
  lastseen: Date;
  sessionCount: number;
  locale: string;
}

export interface Isession extends Nano.MaybeDocument {
  user: Iuser;
  state: Istate;
  historic: Ihistoric;
}