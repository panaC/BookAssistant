import { Inode } from './../../core/middleware/graph/';
import { InodeTable } from './../interface/nodeTable.interface';
import * as node from './../graph';
import { getValueWithStringKey } from '../../core/utils/getValueWithStringKey';
import { help } from '../graph/start/help';
import { listen } from '../graph/start/listen';
import { newBooks } from '../graph/start/newBooks';
import { play } from '../graph/start/listen/play';

export const nodeTable = (): InodeTable => (
  {
    start: node.start,
    startHelp: help,
    startListen: listen,
    startNewBooks: newBooks,
    listenPlay: play,
    no_input: node.noInput,
    cancel: node.cancel,
    fallback: node.fallback,
    error: node.error,
  });
