import { Inode } from './../../../../core/middleware/graph/interface/node.interface';

export * from './control';


export const nextChapter: Inode = {
  return: false,
          context: 'start',
          switch: {
            default: 'start',
          },
          conv: {ask: 'listen.book_found'}
};
