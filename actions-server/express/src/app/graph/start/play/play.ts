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
    return 'play.play';
  },
  conv: {
    media: (conv): MediaObjectOptions => ({
      url: `${conv.middleware.db.session.api.search
        [conv.middleware.db.session.data.bookIndex].readingOrder
          [conv.middleware.db.session.data.trackIndex].href}#t=${conv.middleware.db.session.data.timecode.toString()}`,
      /* set description, name and image in the future */
    })
  }
};