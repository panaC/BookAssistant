import { Inode } from '../../core/middleware/graph';

// global no-input intent
export const noInput: Inode = {
  return: true,
  conv: {
    ask: 'global.no_input'
  }
};

// cancel intent 
export const cancel: Inode = {
  return: true,
  conv: {
    close: 'global.goodbye',
  },
};

// global fallback may be used in app.ts
export const fallback: Inode = {
  return: true,
  conv: {
    close: 'global.fallback',
  },
};

// global error
export const error: Inode = {
  return: true,
  conv: {
    close: [ 
      'error.global',
      'error.error',
    ]
  }
};

