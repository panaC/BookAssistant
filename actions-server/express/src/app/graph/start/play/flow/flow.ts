import { Inode } from './../../../../../core/middleware/graph';

export const endOfBook: Inode = {
  intent: false,
  name: 'play.endOfBook',
  return: false,
  test: () => 'start_intent',
  conv: {
    ask: 'listen.end_of_book',
  }
};