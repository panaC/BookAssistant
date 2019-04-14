import { Inode } from "../../../../core/middleware/graph";

export const play: Inode = {
  return: false,
  context: 'start',
  switch: {
    default: 'start',
  },
  conv: {
    ask: 'listen.first'
  }
};