import {Inode} from '../../..';

export const noInputIntent: Inode = {
  return: true,
  name: 'yesno.control.noInput_intent',
  intent: true,
  conv: {
    ask: 'yesno.control.no_input',
  },
};

export const cancelIntent: Inode = {
  intent: true,
  name: 'yesno.control.cancel_intent',
  return: true,
  conv: {
    close: 'yesno.control.cancel',
  },
};

export const fallbackIntent: Inode = {
  intent: true,
  name: 'yesno.control.fallback_intent',
  return: true,
  conv: {
    close: 'yesno.control.fallback',
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
