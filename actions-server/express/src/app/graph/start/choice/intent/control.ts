import {Inode} from '../../..';

export const noInputIntent: Inode = {
  return: true,
  intent: true,
  name: 'listen.noInput_intent',
  conv: {
    ask: 'choice.control.no_input',
  },
};

export const cancelIntent: Inode = {
  return: true,
  conv: {
    close: 'choice.control.cancel',
  },
};

export const fallbackIntent: Inode = {
  return: true,
  conv: {
    close: 'choice.control.fallback',
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
