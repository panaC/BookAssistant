import { help } from './../graph/start/help';
import { IintentTable } from './../interface';
import * as node from './../graph';
import { listen } from '../graph/start/listen';
import { newBooks } from '../graph/start/newBooks';
import { play } from '../graph/start/listen/play';

export const START_DEFAULT_INTENT = 'start';

export const intentTable = (): IintentTable => ({
  'start': node.start,
  'start.help': help,
  'start.listen': listen,
  'start.newBooks': newBooks,
  'listen.play': play,
  'fallback': node.fallback,
  'no_input': node.noInput,
  'cancel': node.cancel,
});