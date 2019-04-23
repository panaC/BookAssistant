import { InodeTable } from './../../../../interface/nodeTable.interface';
import {Inode} from '../../..';

export const noInputIntent: Inode = {
  intent: true,
  name: 'yesno.control.noInput_intent',
  return: true,
  conv: {
    ask: 'yesno.control.no_input',
  },
};

export const cancelIntent: Inode = {
  intent: true,
  name: 'yesno.control.cancel_intent',
  return: true,
  test: (conv) => {
    const param = conv.contexts.get('yesno');
    if (param) {
      // add check if param return is not corrupted
      return param.parameters.return as keyof InodeTable;
    }
    return "yesno.control.error";
  },
  conv: {
    ask: 'yesno.control.cancel',
  },
};

export const fallbackIntent: Inode = {
  intent: true,
  name: 'yesno.control.fallback_intent',
  return: true,
  conv: {
    ask: 'yesno.control.fallback',
  },
};

export const error: Inode = {
  intent: false,
  name: 'yesno.control.error',
  return: true,
  conv: {
    close: [
      'error.global',
      'error.error',
    ]
  },
};
