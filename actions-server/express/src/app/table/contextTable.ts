import {getValueWithStringKey} from '../../core/utils/getValueWithStringKey';

import {Inode} from './../../core/middleware/graph/';
import {IcontextTable} from './../interface/contextTable.interface';

export const contextTable = (): IcontextTable => ({
  start: 1,
  listen: 5,
  choice: 1,
  yesno: 1,
  play: 5,
});
