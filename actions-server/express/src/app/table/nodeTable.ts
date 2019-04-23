import * as node from './../graph';
import * as start from './../graph/start/index';
import * as listen from './../graph/start/listen/index';
import * as play from './../graph/start/play/index';
import * as choice from './../graph/start/choice/index';
import * as yesno from './../graph/start/yesno/index';
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
  'listen.RefPlay': listen.isRefToPlay,
  'listen.refAskPlay': listen.refAskPlay,
  'listen.refResponsePlay': listen.refResponsePlay,
  'listen.refSetPlay': listen.refSetPlay,
  'listen.checkAlreadyListen': listen.checkAlreadyListen,
  'listen.alreadyListen': listen.alreadyListen,
  'listen.returnAlreadyListen': listen.returnAlreadyListen,

  'listen.control.fallback_intent': listen.fallback,
  'listen.control.noInput_intent': listen.noInput,
  'listen.control.cancel_intent': listen.cancel,
  'listen.control.error': listen.error,

  'play.play': play.play,
  'play.endOfBook': play.endOfBook,
  'play.rePlay_intent': play.rePlayIntent,
  'play.stopPlay_intent': play.stopPlayIntent,
  'play.mediaStatus_intent': play.mediaStatusIntent,
  'play.pausePlay_intent': play.pausePlayIntent,
  'play.nextChapter_intent': play.nextChapterIntent,
  'play.prevChapter_intent': play.prevChapterIntent,

  'play.control.fallback_intent': play.fallback,
  'play.control.noInput_intent': play.noInput,
  'play.control.cancel_intent': play.cancel,
  'play.control.error': play.error,

  'choice.getNumber_intent': choice.getNumberIntent,

  'choice.control.noInput_intent': choice.noInputIntent,
  'choice.control.cancel_intent': choice.cancelIntent,
  'choice.control.fallback_intent': choice.fallbackIntent,
  'choice.control.error': choice.error,

  'yesno.get_intent': yesno.get,

  'yesno.control.noInput_intent': yesno.noInputIntent,
  'yesno.control.cancel_intent': yesno.cancelIntent,
  'yesno.control.fallback_intent': yesno.fallbackIntent,
  'yesno.control.error': yesno.error,

  'fallback_intent': node.fallbackIntent,
  'noInput_intent': node.noInputIntent,
  'cancel_intent': node.cancelIntent,
  'error': node.error,
});
