import { Inode } from './../..';

export const noInput: Inode = {
  return: true,
  conv: {
    ask: 'listen.control.no_input',
  },
  switch: {
    default: 'startListen',
  }
};

export const cancel: Inode = {
  return: true,
  conv: {
    close: 'listen.control.cancel',
  },
  switch: {
    default: 'startListen'
  }
};

export const fallback: Inode = {
  return: true,
  conv: {
    close: 'listen.control.fallback',
  },
  switch: {
    default: 'startListen'
  }
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
    default: 'startListen',
  }
};

