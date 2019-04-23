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

    conv.middleware.db.session.data.reference = ref[0];
    return 'listen.refSetPlay';
  }
};

export const refAskPlay: Inode = {
  intent: false,
  name: 'listen.refAskPlay',
  return: true,
  context: {
    name: 'choice',
    return: 'listen.refResponsePlay',
  },
  conv: {
    arg: (conv): string[] => {
    const re = conv.middleware.db.session.data.refTellByUser;
    const api = conv.middleware.db.session.api;
    const toc = api.search[conv.middleware.db.session.data.bookIndex].toc;
    const ref = conv.middleware.api.fuse(re)(conv.middleware.api.flattenToc(toc));
      return ref.map(
        (r, index) =>
          `numero ${index + 1} ${r}`);
    },
    ask: 'choice.select_ref',
  }
};

export const refResponsePlay: Inode = {
  intent: false,
  name: 'listen.refResponsePlay',
  return: false,
  test: (conv) => {
    const c = conv.middleware.db.session.data.context.choice;
    const re = conv.middleware.db.session.data.refTellByUser;
    const api = conv.middleware.db.session.api;
    const toc = api.search[conv.middleware.db.session.data.bookIndex].toc;
    const ref = conv.middleware.api.fuse(re)(conv.middleware.api.flattenToc(toc));
    const l = ref.length;
    if (c > 0 && c <= l) {
      conv.middleware.db.session.data.reference = ref[c];
      return 'listen.refSetPlay';
    } else {
      // error wrong choice selectBook
      return 'listen.RefPlay';
    }
  }
};

export const refSetPlay: Inode = {
  intent: false,
  name: 'listen.refSetPlay',
  return: false,
  test: (conv) => {
    const api = conv.middleware.db.session.api;
    const toc = api.search[conv.middleware.db.session.data.bookIndex].toc;
    const ro = api.search[conv.middleware.db.session.data.bookIndex].readingOrder;
    const ref = conv.middleware.db.session.data.reference;
    const href = conv.middleware.api.refGetHrefWithRef(toc, ref);
    if (href) {
      conv.middleware.db.session.data.trackIndex = conv.middleware.api.refGetTrackWithHref(ro, href);
      try {
        // tslint:disable-next-line:ban
        conv.middleware.db.session.data.timecode = parseInt(href.split('#t=')[1], 10) || 0;
      } catch(e) {
        conv.middleware.db.session.data.timecode = 0;
      }
    }
    return 'play.play';
  }
};