import {Inode} from '../../core/middleware/graph';

// global no-input intent
export const noInputIntent: Inode = {
  intent: true,
  name: 'noInput_intent',
  return: false,
  test: () => 'start_intent',
  conv: {
    ask: 'start.no_input'
  }
};

// cancel intent
export const cancelIntent: Inode = {
  intent: true,
  name: 'cancel_intent',
  return: true,
  conv: {
    close: 'start.goodbye',
  },
};

// global fallback may be used in app.ts
export const fallbackIntent: Inode = {
  intent: true,
  name: 'fallback_intent',
  return: false,
  test: () => 'start_intent',
  conv: {
    ask: 'start.fallback',
  },
};

// global error
export const error: Inode = {
  intent: false,
  name: 'error',
  return: true,
  conv: {
    close: [
      'error.global',
      'error.error',
    ]
  }
};
