import { debug } from './../../../../core/utils/debug';
import { MediaObjectOptions } from 'actions-on-google';
import { Inode } from './../../../../core/middleware/graph';

export const play: Inode = {
  intent: false,
  name: 'play.play',
  return: true,
  context: {
    name: 'play',
  },
  test: (conv) => {
    // trig the timer to save time elapsed
    conv.middleware.db.session.data.timer.time = new Date().getTime();
    debug.app.log('play.play');
    debug.app.log('trackindex', conv.middleware.db.session.data.trackIndex);
    debug.app.log('timecode', conv.middleware.db.session.data.timecode);
    return 'play.play';
  },
  conv: {
    ask: 'play.follow',
    media: (conv): MediaObjectOptions => ({
      url: `${conv.middleware.db.session.api.search
        [conv.middleware.db.session.data.bookIndex].readingOrder
          [conv.middleware.db.session.data.trackIndex].href}#t=${conv.middleware.db.session.data.timecode.toString()}`,
      /* set description, name and image in the future */
    }),
    suggestion: [
      'play.suggestion.next',
      'play.suggestion.prev'
    ]
  }
};