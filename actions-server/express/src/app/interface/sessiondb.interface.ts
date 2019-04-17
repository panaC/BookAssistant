import {Iopds} from '../api';

import {Iwebpub} from './../api';

export interface IsessionDataDb {}

export interface IsessionApiDb {
  discovery: Iopds;
  search: Iwebpub[];
}