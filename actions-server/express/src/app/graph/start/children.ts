import { DFConv } from './../../app';
import { Inode } from '../../../interface/node.interface';
import { start } from './start';
import { cancel, fallback, noInput } from '../graph';

export const startName: Inode = {
  switch: {
    default: 'start',
  },
  conv: {
    ask: 'ton nom est pierre',
  },
};

export const startAge: Inode = {
  switch: {
    default: 'start',
  },
  conv: {
    ask: 'ton age est 24 ans',
  }, 
};

// no longer used since intent catch it's own node
export const startChoice: Inode = {
  test: (conv: DFConv) => conv.intent,
  switch: {
    case: [
      'startName',
      'startAge',
      'noInput',
      'cancel',
    ],
    default: 'fallback',
  },
};