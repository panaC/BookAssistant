import {Inode} from './../../core/middleware/graph';

export interface InodeTable {
  'start_intent': Inode;

  'start.newBooks_intent': Inode;
  'start.help_intent': Inode;
  'start.listen_intent': Inode;

  'listen.error': Inode;
  'listen.selectBook': Inode;
  'listen.RefPlay': Inode;
  'listen.Play': Inode;
  'listen.nextChapter_intent': Inode;
  'listen.fallback_intent': Inode;
  'listen.noInput_intent': Inode;
  'listen.cancel_intent': Inode;

  'fallback_intent': Inode;
  'noInput_intent': Inode;
  'cancel_intent': Inode;
  'error': Inode;
}