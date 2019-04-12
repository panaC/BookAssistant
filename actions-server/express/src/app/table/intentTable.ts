import { getValueWithStringKey } from '../../core/utils/getValueWithStringKey';
import { Inode } from './../../core/middleware/graph/';
import { IintentTable } from './../interface';
import * as node from './../graph';

export const START_DEFAULT_INTENT = 'start';

export const intentTable = (): IintentTable => ({
  'start': node.start,
  'start.age': node.startAge,
  'start.name': node.startName,
  'fallback': node.fallback,
  'no_input': node.noInput,
  'cancel': node.cancel,
});