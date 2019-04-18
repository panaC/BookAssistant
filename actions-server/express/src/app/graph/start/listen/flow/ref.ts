import { Inode } from './../../../../../core/middleware/graph';

export const refPlay: Inode = {
  intent: false,
  name: 'listen.RefPlay',
  return: false,
  test: (conv) => {
    const re = conv.middleware.db.session.data.refTellByUser;
    const api = conv.middleware.db.session.api;
    const toc = api.search[conv.middleware.db.session.data.bookIndex].toc;
    const ref = conv.middleware.api.fuse(re)(conv.middleware.api.flattenToc(toc));

    if (ref.length > 1) {
      return 'listen.refAskPlay';
    }

    return 'listen.refSetPlay';
  }
};

export const refAskPlay: Inode = {
  intent: false,
  name: 'listen.refAskPlay',
  return: false,
  context: {
    name: 'choice',
    return: 'listen.refResponsePlay',
  },
};

export const refSetPlay: Inode = {
  intent: false,
  name: 'listen.refSetPlay',
  return: false,
};