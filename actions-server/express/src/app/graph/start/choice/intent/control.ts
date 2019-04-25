import { InodeTable } from './../../../../interface/nodeTable.interface';
import {Inode} from '../../..';

export const noInputIntent: Inode = {
  intent: true,
  name: 'choice.control.noInput_intent',
  return: true,
  conv: {
    ask: 'choice.control.no_input',
  },
};

export const cancelIntent: Inode = {
  intent: true,
  name: 'choice.control.cancel_intent',
  return: true,
  test: (conv) => {
    const param = conv.contexts.get('choice');
    if (param) {
      // add check if param return is not corrupted
      return param.parameters.return as keyof InodeTable;
    }
    return "choice.control.error";
  },
  conv: {
    ask: 'choice.control.cancel',
  },
};

export const fallbackIntent: Inode = {
  intent: true,
  name: 'choice.control.fallback_intent',
  return: true,
  conv: {
    ask: 'choice.control.fallback',
  },
};

export const error: Inode = {
  intent: false,
  name: 'choice.control.error',
  return: true,
  conv: {
    arg: (conv) => conv.middleware.db.session.data._error,
    close: 'error.global',
  },
};
