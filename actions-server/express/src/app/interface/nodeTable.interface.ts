import { Inode } from './../../core/middleware/graph';

export interface InodeTable {
  start: Inode;
  startChoice: Inode;
  startName: Inode;
  startAge: Inode;
  noInput: Inode;
  cancel: Inode;
  error: Inode;

  // require
  fallback: Inode;
}