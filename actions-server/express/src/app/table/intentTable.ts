import * as node from './../graph';
import {help} from './../graph/start/help';
import * as start from './../graph/start/index';
import * as listen from './../graph/start/listen/index';
import {IintentTable} from './../interface';

export const START_DEFAULT_INTENT = 'start';

export const intentTable = (): IintentTable => ({
  'start': node.start,

  'start.help': start.help,
  'start.listen': start.listen,
  'start.newBooks': start.newBooks,


  'listen.nextChapter': listen.nextChapter,
  'listen.fallback': listen.fallback,
  'listen.cancel': listen.cancel,
  'listen.no_input': listen.noInput,


  'fallback': node.fallback,
  'no_input': node.noInput,
  'cancel': node.cancel,
});