import * as node from './../graph';
import * as start from './../graph/start/index';
import * as listen from './../graph/start/listen/index';
import { InodeTable } from './../interface/nodeTable.interface';

export const nodeTable = (): InodeTable => ({
  'start_intent': node.start,

  'start.newBooks_intent': start.newBooks,
  'start.help_intent': start.help,
  'start.listen_intent': listen.start,

  'listen.error': listen.error,
  'listen.getBook': listen.getBook,
  'listen.selectBook': listen.selectBook,
  'listen.checkSelectBook': listen.checkSelectBook,
  'listen.IsRefPlay': listen.isRefToPlay,
  'listen.RefPlay':,
  'listen.refAskPlay':,
  'listen.refResponsePlay':,
  'listen.refSetPlay':,
  'listen.checkAlreadyListen': listen.checkAlreadyListen,
  'listen.alreadyListen': listen.alreadyListen,
  'listen.returnAlreadyListen': listen.returnAlreadyListen,

  'listen.control.fallback_intent': listen.fallback,
  'listen.control.noInput_intent': listen.noInput,
  'listen.control.cancel_intent': listen.cancel,
  'listen.control.error':,

  'play.play': play.play,
  'play.endOfBook':,
  'play.rePlay_intent':,
  'play.stopPlay_intent':,
  'play.mediaStatus_intent':,
  'play.pausePlay_intent':,
  'play.nextChapter_intent':,
  'play.prevChapter_intent':,

  'play.control.fallback_intent':,
  'play.control.noInput_intent':,
  'play.control.cancel_intent':,
  'play.control.error',

  'choice.getNumber_intent':,

  'choice.control.noInput_intent':,
  'choice.control.cancel_intent':,
  'choice.control.fallback_intent':,
  'choice.control.error':,

  'yesno.get_intent':,

  'yesno.control.noInput_intent':,
  'yesno.control.cancel_intent':,
  'yesno.control.fallback_intent':,
  'yesno.control.error':,

  'fallback_intent': node.fallback,
  'noInput_intent': node.noInput,
  'cancel_intent': node.cancel,
  'error': node.error,
});
