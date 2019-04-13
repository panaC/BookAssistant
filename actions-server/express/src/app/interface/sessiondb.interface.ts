import { Iwebpub } from './../api';
import { Iopds } from '../api';

export interface IsessionDataDb {
  
}

export interface IsessionApiDb {
  discovery: Iopds;
  search: Iwebpub[];
}