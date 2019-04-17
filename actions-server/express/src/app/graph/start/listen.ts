import {IDFConv} from '../../../core';
import {Inode} from '../../../core/middleware/graph';

export const listen: Inode = {
  return: true, context: 'listen', conv: {
    arg: (conv: IDFConv): string[] =>
        [conv.parameters.title as string, conv.parameters.author as string,
         conv.parameters.reference as string],
    ask: 'listen.book',
  }
};