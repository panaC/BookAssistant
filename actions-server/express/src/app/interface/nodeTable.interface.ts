import { Inode } from './../../core/middleware/graph';

export interface InodeTable {
  start: Inode;

  startNewBooks: Inode;
  startHelp: Inode;
  startListen: Inode;

  listenPlay: Inode;
  listenError: Inode;

  fallback: Inode;
  error: Inode;
}