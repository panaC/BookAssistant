import {Iopds} from '../api';

import {Iwebpub} from './../api';

export interface IsessionDataDb {
  timer: {
    time: number;
  };
  context: {
    choice: number;
    yes_no: boolean;
  };
  /**
   * bookIndex
   */
  bookIndex: number;
  /**
   * array index from reading-order in webpub
   */
  trackIndex: number;
  /**
   * Timecode audio
   * update at each interaction during media playing
   */
  timecode: number;
  /**
   * string ref that correspond to refTellByUser
   */
  reference: string;
  /**
   * Title tell by user
   */
  titleTellByUser: string;
  /**
   * Author name tell by user
   */
  authorTellByUser: string;
  /**
   * Reference name tell by user
   */
  refTellByUser: string;
  /**
   * chapter num tell by user
   */
  chapterTellByUser: string;
}

export interface IsessionApiDb {
  discovery: Iopds;
  search: Iwebpub[];
}