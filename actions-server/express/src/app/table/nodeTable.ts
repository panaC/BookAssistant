import * as node from './../graph';
import * as start from './../graph/start/index';
import * as listen from './../graph/start/listen/index';
import {InodeTable} from './../interface/nodeTable.interface';

export const nodeTable = (): InodeTable => ({
  'start_intent': node.start,

  'start.newBooks_intent': start.newBooks,
  'start.help_intent': start.help,
  'start.listen_intent': start.listen,

  'listen.error': listen.error,
  'listen.selectBook':,
  'listen.RefPlay':,
  'listen.Play':,
  'listen.nextChapter_intent':,
  'listen.fallback_intent':,
  'listen.noInput_intent':,
  'listen.cancel_intent':,

  'fallback_intent': node.fallback,
  'noInput_intent': node.noInput,
  'cancel_intent': node.cancel,
  'error': node.error,
});
