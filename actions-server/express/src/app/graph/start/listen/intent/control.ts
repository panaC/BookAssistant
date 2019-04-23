import {Inode} from '../../..';

export const noInput: Inode = {
  return: false,
  name: 'listen.control.noInput_intent',
  intent: true,
  conv: {
    ask: 'listen.control.no_input',
  },
};

export const cancel: Inode = {
  intent: true,
  name: 'listen.control.cancel_intent',
  return: true,
  conv: {
    close: 'listen.control.cancel',
  },
};

export const fallback: Inode = {
  intent: true,
  name: 'listen.control.fallback_intent',
  return: false,
  conv: {
    close: 'listen.control.fallback',
  },
};

export const error: Inode = {
  intent: false,
  name: 'listen.error',
  return: true,
  conv: {
    close: [
      'error.global',
      'error.error',
    ]
  },
};
