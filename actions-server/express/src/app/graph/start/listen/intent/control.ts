import {Inode} from '../../..';

export const noInput: Inode = {
  intent: true,
  name: 'listen.control.noInput_intent',
  return: false,
  test: () => 'start.listen_intent',
  conv: {
    ask: 'listen.control.no_input',
  },
};

// When audiobook isn't already started
// cancel quit the application
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
  test: () => 'start.listen_intent',
  conv: {
    ask: 'listen.control.fallback',
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
