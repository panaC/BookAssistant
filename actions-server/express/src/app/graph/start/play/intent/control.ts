import {Inode} from '../../..';

export const noInput: Inode = {
  intent: true,
  name: 'play.control.noInput_intent',
  return: false,
  test: () => 'play.play',
  conv: {
    ask: 'play.control.no_input',
  },
};

// user said cancel during playing
// 2 signification :
// - cancel my ask and return to playing
// - cancel/stop the playing and return to start menu
//
export const cancel: Inode = {
  intent: true,
  name: 'play.control.cancel_intent',
  return: false,
  test: () => 'play.play',
  conv: {
    ask: 'play.control.cancel',
  },
};

export const fallback: Inode = {
  intent: true,
  name: 'play.control.fallback_intent',
  return: false,
  test: (conv) => {
    if (!conv.middleware.db.session.data.IsItInPause) {
      conv.middleware.db.session.data.timecode =
        (new Date().getTime() - conv.middleware.db.session.data.timer.time) / 1000 - 5;
      conv.middleware.db.session.data.timer.time = 0;
    }
    return 'play.play';
  },
  conv: {
    ask: 'play.control.fallback',
  },
};

export const error: Inode = {
  intent: false,
  name: 'play.control.error',
  return: true,
  conv: {
    arg: (conv) => conv.middleware.db.session.data._error,
    close: 'error.global',
  },
};
