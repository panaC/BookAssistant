import { Inode } from './../../core/middleware/graph';

export interface InodeTable {
  start: Inode;
  startNewBooks: Inode;
  startHelp: Inode;
  startListen: Inode;
  listenPlay: Inode;
  no_input: Inode;
  cancel: Inode;
  error: Inode;
  // require
  fallback: Inode;
}