import { Inode } from './../../interface/node.interface';

export const noInput: Inode = {
  return: true,
  conv: {
    ask: 'tu ne dis rien'
  }
};

export const error: Inode = {
  return: true,
  conv: {
    close: 'Oups, erreur logiciel'
  }
};

export const cancel: Inode = {
  return: true,
  conv: {
    close: 'Au revoir',
  },
};

export const fallback: Inode = {
  return: true,
  conv: {
    close: 'pas compris',
  },
};
