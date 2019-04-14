import { Inode } from "../../../core/middleware/graph";

export const listen: Inode = {
  return: true,
  context: 'listen',
  conv: {
    ask: 'listen.home',
  }
};