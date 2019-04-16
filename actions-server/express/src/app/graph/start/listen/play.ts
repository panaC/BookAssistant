import { Inode } from './../..';

export const play: Inode = {
  return: false,
  context: 'start',
  switch: {
    default: 'start',
  },
  conv: {
    ask: 'listen.book_found'
  }
};