import {Inode} from '../../..';

export const noInputIntent: Inode = {
  return: true,
  intent: true,
  name: 'choice.control.noInput_intent',
  conv: {
    ask: 'choice.control.no_input',
  },
};

export const cancelIntent: Inode = {
  intent: true,
  name: 'choice.control.cancel_intent',
  return: true,
  conv: {
    close: 'choice.control.cancel',
  },
};

export const fallbackIntent: Inode = {
  intent: true,
  name: 'choice.control.fallback_intent',
  return: true,
  conv: {
    close: 'choice.control.fallback',
  },
};

export const error: Inode = {
  return: true,
  name: 'choice.control.error',
  intent: false,
  conv: {
    close: [
      'error.global',
      'error.error',
    ]
  },
};