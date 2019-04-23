import {Inode} from '../../..';

export const noInput: Inode = {
  return: false,
  intent: true,
  name: 'play.control.noInput_intent',
  conv: {
    ask: 'listen.control.no_input',
  },
};

export const cancel: Inode = {
  intent: true,
  name: 'play.control.cancel_intent',
  return: true,
  conv: {
    close: 'listen.control.cancel',
  },
};

export const fallback: Inode = {
  intent: true,
  name: 'play.control.fallback_intent',
  return: false,
  conv: {
    close: 'listen.control.fallback',
  },
};

export const error: Inode = {
  return: true,
  conv: {
    close: [
      'error.global',
      'error.error',
    ]
  },
};
