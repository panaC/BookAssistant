import { Inode } from "../../../core/middleware/graph";

export const newBooks: Inode = {
  return: true,
  context: 'start',
  api: async (conv, f) => await f.discovery(conv),
  conv: {
    ask: [
      'newBook.home',
      'welcome.home'
    ],
  },
};