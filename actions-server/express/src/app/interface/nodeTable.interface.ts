import {Inode} from './../../core/middleware/graph';

export interface InodeTable {
  'start_intent': Inode;

  'start.newBooks_intent': Inode;
  'start.help_intent': Inode;
  'start.listen_intent': Inode;

  'listen.error': Inode;
  'listen.getBook': Inode;
  'listen.selectBook': Inode;
  'listen.checkSelectBook': Inode;
  'listen.IsRefPlay': Inode;
  'listen.RefPlay': Inode;
  'listen.refAskPlay': Inode;
  'listen.refResponsePlay': Inode;
  'listen.refSetPlay': Inode;
  'listen.checkAlreadyListen': Inode;
  'listen.alreadyListen': Inode;
  'listen.returnAlreadyListen': Inode;
  'listen.play': Inode;
  'listen.endOfBook': Inode;
  'listen.rePlay_intent': Inode;
  'listen.stopPlay_intent': Inode;
  'listen.mediaStatus_intent': Inode;
  'listen.pausePlay_intent': Inode;
  'listen.nextChapter_intent': Inode;
  'listen.prevChapter_intent': Inode;
  'listen.fallback_intent': Inode;
  'listen.noInput_intent': Inode;
  'listen.cancel_intent': Inode;

  'choice.getNumber_intent': Inode;

  'choice.control.noInput_intent': Inode;
  'choice.control.cancel_intent': Inode;
  'choice.control.fallback_intent': Inode;
  'choice.control.error': Inode;

  // require
  'fallback_intent': Inode;
  'noInput_intent': Inode;
  'cancel_intent': Inode;
  'error': Inode;
}