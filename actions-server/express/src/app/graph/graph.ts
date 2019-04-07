import { Inode } from './../../interface/node.interface';

// global no-input intent
export const noInput: Inode = {
  return: true,
  conv: {
    ask: 'tu ne dis rien'
  }
};

// cancel intent 
export const cancel: Inode = {
  return: true,
  conv: {
    close: 'Au revoir',
  },
};

// global fallback may be used in app.ts
export const fallback: Inode = {
  return: true,
  conv: {
    close: 'pas compris',
  },
};

// global error
export const error: Inode = {
  return: true,
  conv: {
    close: 'error.global'
  }
};