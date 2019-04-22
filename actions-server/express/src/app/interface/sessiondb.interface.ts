import {Iopds} from '../api';

import {Iwebpub} from './../api';

export interface IsessionDataDb {
  /**
   * True if listen is it in pause playing mode
   */
  IsItInPause: boolean;
  /**
   * Timer object contains
   * Timestamp from beginning of book playing
   */
  timer: {
    time: number;
  };
  /**
   * Sub-context call by discovery or listen
   */
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