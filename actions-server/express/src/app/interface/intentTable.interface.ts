import {Inode} from './../../core/middleware/graph';

export interface IintentTable {
  'start': Inode;

  'start.newBooks': Inode;
  'start.help': Inode;
  'start.listen': Inode;


  'listen.nextChapter': Inode;
  'listen.fallback': Inode;
  'listen.no_input': Inode;
  'listen.cancel': Inode;


  'fallback': Inode;
  'no_input': Inode;
  'cancel': Inode;
}