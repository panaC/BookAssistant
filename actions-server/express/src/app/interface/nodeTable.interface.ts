import { Inode } from './../../core/middleware/graph';

export interface InodeTable {
  'start_intent': Inode;

  'start.newBooks_intent': Inode;
  'start.help_intent': Inode;
  'start.listen_intent': Inode;

  'listen.getBook': Inode;
  'listen.bookNotFound': Inode;
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

  'listen.control.fallback_intent': Inode;
  'listen.control.noInput_intent': Inode;
  'listen.control.cancel_intent': Inode;
  'listen.control.error': Inode;

  'play.play': Inode;
  'play.endOfBook': Inode;
  'play.rePlay_intent': Inode;
  'play.stopPlay_intent': Inode;
  'play.mediaStatus_intent': Inode;
  'play.pausePlay_intent': Inode;
  'play.nextChapter_intent': Inode;
  'play.prevChapter_intent': Inode;

  'play.control.fallback_intent': Inode;
  'play.control.noInput_intent': Inode;
  'play.control.cancel_intent': Inode;
  'play.control.error': Inode;

  'choice.getNumber_intent': Inode;

  'choice.control.noInput_intent': Inode;
  'choice.control.cancel_intent': Inode;
  'choice.control.fallback_intent': Inode;
  'choice.control.error': Inode;

  'yesno.getYes_intent': Inode;
  'yesno.getNo_intent': Inode;

  'yesno.control.noInput_intent': Inode;
  'yesno.control.cancel_intent': Inode;
  'yesno.control.fallback_intent': Inode;
  'yesno.control.error': Inode;

  // require
  'fallback_intent': Inode;
  'noInput_intent': Inode;
  'cancel_intent': Inode;
  'error': Inode;
}