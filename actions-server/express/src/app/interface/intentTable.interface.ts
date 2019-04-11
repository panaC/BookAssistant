import { Inode } from './../../core/middleware/graph';

export interface IintentTable {
  'start': Inode;
  'start.age': Inode;
  'start.name': Inode;
  'fallback': Inode;
  'no_input': Inode;
  'cancel': Inode;
}