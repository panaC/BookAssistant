import {Inode} from '../../..';

export const nextChapterIntent: Inode = {
  intent: true,
  name: 'play.nextChapter_intent',
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

    return 'play.play';
  }
};

export const prevChapterIntent: Inode = {
  intent: true,
  name: 'play.prevChapter_intent',
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

    return 'play.play';
  }
};

export const pausePlayIntent: Inode = {
  intent: true,
  name: 'play.pausePlay_intent',
  return: true,
  context: {
    name: 'play',
  },
  test: (conv) => {
    if (!conv.middleware.db.session.data.IsItInPause) {
      conv.middleware.db.session.data.timecode =
        (new Date().getTime() - conv.middleware.db.session.data.timer.time) / 1000 - 5;
      conv.middleware.db.session.data.timer.time = 0;
    }
    conv.middleware.db.session.data.IsItInPause = true;
    return 'play.pausePlay_intent';
  },
  conv: {
    ask: 'play.follow',
    media: (conv) => ({
      url: 'https://raw.githubusercontent.com/anars/blank-audio/master/1-hour-of-silence.mp3',
    }),
    suggestion: 'play.pause'
  },
};

export const mediaStatusIntent: Inode = {
  intent: true,
  name: 'play.mediaStatus_intent',
  return: false,
  test: (conv) => {
    if (conv.middleware.db.session.data.IsItInPause) {
      // re-playing silent sound
      return 'play.pausePlay_intent';
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
        return 'play.endOfBook';
      }
      return 'play.play';
    }
    //error playing
    return 'play.control.error';
  }
};

export const rePlayIntent: Inode = {
  intent: true,
  name: 'play.rePlay_intent',
  return: false,
  test: (conv) => {
    if (!conv.middleware.db.session.data.IsItInPause) {
      conv.middleware.db.session.data.timecode =
        (new Date().getTime() - conv.middleware.db.session.data.timer.time) / 1000 - 5;
      conv.middleware.db.session.data.timer.time = 0;
    }
    return 'play.play';
  }
};

export const stopPlayIntent: Inode = {
  intent: true,
  name: 'play.stopPlay_intent',
  return: false,
  test: (conv) => {
    // stop playing book and return
    const rst = conv.middleware.db.session.data;
    // saved timocode reference in user storage
    const o = conv.middleware.db.user.data.bookAlreadyListen
          [conv.middleware.db.session.data.bookIndex];
    o.timecode = rst.timecode;
    o.track = rst.trackIndex;
    o.lastListen = new Date();

    // return to "what do you want to do ?"
    // reset all session storage
    rst.IsItInPause = false;
    rst.authorTellByUser = '';
    rst.bookIndex = 0;
    rst.chapterTellByUser = '';
    rst.refTellByUser = '';
    rst.reference = '';
    rst.timecode = 0;
    rst.timer.time = 0;
    rst.titleTellByUser = '';
    rst.trackIndex = 0;
    return 'start_intent';
  }
};