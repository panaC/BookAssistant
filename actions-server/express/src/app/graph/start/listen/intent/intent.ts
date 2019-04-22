import { Inode } from './../../../../../core/middleware/graph/interface/node.interface';

export const listenNextChapterIntent: Inode = {
  intent: true,
  name: 'listen.nextChapter_intent',
  return: false,
  test: (conv) => {
    const api = conv.middleware.db.session.api;
    const toc = api.search[conv.middleware.db.session.data.bookIndex].toc;
    const ro = conv.middleware.db.session.api.search
      [conv.middleware.db.session.data.bookIndex].readingOrder;
    const href = ro[conv.middleware.db.session.data.trackIndex].href;
    const time = 
      conv.middleware.db.session.data.timecode =
        (new Date().getTime() - conv.middleware.db.session.data.timer.time) / 1000 - 5;
    const ref = conv.middleware.api.refGetRefWithTimecode(toc, href, time);
    if (ref) {
      const nextRef = conv.middleware.api.refGetPrevNextRefWithRef(toc, ref, 1);
      if (nextRef) {
        const hrefFromRef = conv.middleware.api.refGetHrefWithRef(toc, nextRef);
        if (hrefFromRef) {
          try {
            // tslint:disable-next-line:ban
            conv.middleware.db.session.data.timecode = parseInt(hrefFromRef.split('#t=')[1], 10);
          } catch(e) {}
          conv.middleware.db.session.data.trackIndex =
            conv.middleware.api.refGetTrackWithHref(ro, hrefFromRef.split('#t=')[0]);
        }
      }
    }

    return 'listen.play';
  }
};

export const prevChapterIntent: Inode = {
  intent: true,
  name: 'listen.prevChapter_intent',
  return: false,
  test: (conv) => {
    const api = conv.middleware.db.session.api;
    const toc = api.search[conv.middleware.db.session.data.bookIndex].toc;
    const ro = conv.middleware.db.session.api.search
      [conv.middleware.db.session.data.bookIndex].readingOrder;
    const href = ro[conv.middleware.db.session.data.trackIndex].href;
    const time = 
      conv.middleware.db.session.data.timecode =
        (new Date().getTime() - conv.middleware.db.session.data.timer.time) / 1000 - 5;
    const ref = conv.middleware.api.refGetRefWithTimecode(toc, href, time);
    if (ref) {
      const nextRef = conv.middleware.api.refGetPrevNextRefWithRef(toc, ref, -1);
      if (nextRef) {
        const hrefFromRef = conv.middleware.api.refGetHrefWithRef(toc, nextRef);
        if (hrefFromRef) {
          try {
            // tslint:disable-next-line:ban
            conv.middleware.db.session.data.timecode = parseInt(hrefFromRef.split('#t=')[1], 10);
          } catch(e) {}
          conv.middleware.db.session.data.trackIndex =
            conv.middleware.api.refGetTrackWithHref(ro, hrefFromRef.split('#t=')[0]);
        }
      }
    }

    return 'listen.play';
  }
};

export const pausePlayIntent: Inode = {

  intent: true,
  name: 'listen.pausePlay_intent',
  return: true,
  test: (conv) => {
    if (!conv.middleware.db.session.data.IsItInPause) {
      conv.middleware.db.session.data.timecode =
        (new Date().getTime() - conv.middleware.db.session.data.timer.time) / 1000 - 5;
    }
    conv.middleware.db.session.data.IsItInPause = true;
    return 'listen.pausePlay_intent';
  },
  conv: {
    media: (conv) => ({
      url: 'https://raw.githubusercontent.com/anars/blank-audio/master/1-hour-of-silence.mp3',
    }),
  },
};

export const mediaStatusIntent: Inode = {
  intent: true,
  name: 'listen.mediaStatus_intent',
  return: false,
  test: (conv) => {
    if (conv.middleware.db.session.data.IsItInPause) {
      // re-playing silent sound
      return 'listen.pausePlay_intent';
    }
    const mediaStatus = conv.arguments.get('MEDIA_STATUS');
    const data = conv.middleware.db.session.data;
    const ro = conv.middleware.db.session.api.search
      [conv.middleware.db.session.data.bookIndex].readingOrder;
    if (mediaStatus && mediaStatus.status === 'FINISHED') {
      data.timecode = 0;
      data.timer.time = 0;
      data.trackIndex++;
      if (ro.length >= data.trackIndex) {
        // end of book
        return 'listen.endOfBook';
      }
      return 'listen.play';
    }
    //error playing
    return 'listen.error';
  }
};
