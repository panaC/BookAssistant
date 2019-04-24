import {Inode} from '../../../../../core/middleware/graph';

export const newBooks: Inode = {
  intent: true,
  name: 'start.newBooks_intent',
  return: false,
  context: {
    name: 'start',
  },
  test: () => 'start_intent',
  api: async (conv, f) => await f.discovery(conv),
  conv: {
    ask: [
      'discovery.newBooks.home',
    ],
  },
};