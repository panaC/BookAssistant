import { Eaudiobook } from '../service/audiobook.service';

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

interface ImediaId {
  [identifier: string]: number;
}

export interface IuserStorage {
  mediaIdentifier: ImediaId;
  lastSeen: Date;
}
