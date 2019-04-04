import { DFConv } from './../../app';
import { Inode } from '../../../interface/node.interface';
import { start } from './start';
import { cancel, fallback, noInput } from '../graph';

export const startName: Inode = {
  switch: {
    default: start,
  },
  conv: {
    ask: 'ton nom est pierre',
  },
};

export const startAge: Inode = {
  switch: {
    default: start,
  },
  conv: {
    ask: 'ton age est 24 ans',
  }, 
};

export const startChoice: Inode = {
  test: (conv: DFConv) => conv.intent,
  switch: {
    case: [
      { value: 'start.name', node: startName },
      { value: 'start.age', node: startAge },
      { value: 'noInput', node: noInput },
      { value: 'cancel', node: cancel },
    ],
    default: fallback,
  },
};