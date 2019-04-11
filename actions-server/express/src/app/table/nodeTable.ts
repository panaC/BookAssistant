import { Inode } from './../../core/middleware/graph/';
import { InodeTable } from './../interface/nodeTable.interface';
import * as node from './../graph';
import { getValueWithStringKey } from '../../core/utils/getValueWithStringKey';

export const nodeTable = (): InodeTable => (
  {
    start: node.start,
    startChoice: node.startChoice,
    startName: node.startName,
    startAge: node.startAge,
    noInput: node.noInput,
    cancel: node.cancel,
    fallback: node.fallback,
    error: node.error,
  });

export const getNodeInSymbolTable = (name: keyof InodeTable) =>
  getValueWithStringKey<InodeTable, Inode>(nodeTable, name, nodeTable.fallback);