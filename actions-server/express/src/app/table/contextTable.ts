import { Inode } from './../../core/middleware/graph/';
import { getValueWithStringKey } from '../../core/utils/getValueWithStringKey';
import { IcontextTable } from './../interface/contextTable.interface';

export const contextTable = (): IcontextTable => (
  {
    start: 1
  });

export const getNodeInContextTable = (name: keyof IcontextTable) =>
  getValueWithStringKey<IcontextTable, number>(contextTable, name, 5);