import {Inode} from '../../..';

export const noInput: Inode = {
  return: false,
  intent: true,
  name: 'listen.noInput_intent',
  conv: {
    ask: 'listen.control.no_input',
  },
  switch: {
    default: 'listen.Play',
  }
};

export const cancel: Inode = {
  return: true,
  conv: {
    close: 'listen.control.cancel',
  },
};

export const fallback: Inode = {
  return: false,
  conv: {
    close: 'listen.control.fallback',
  },
  switch: { default: 'listen.Play' }
};

export const error: Inode = {
  return: true,
  conv: {
    close: [
      'error.global',
      'error.error',
    ]
  },
  switch: {
    default: 'start_intent',
  }
};
