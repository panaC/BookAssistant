import { Inode } from './../../core/middleware/graph';

export interface IintentTable {
  'start': Inode;
  'start.newBooks': Inode;
  'start.help': Inode;
  'start.listen': Inode;
  'listen.play': Inode;
  'fallback': Inode;
  'no_input': Inode;
  'cancel': Inode;
}