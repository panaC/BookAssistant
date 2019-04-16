import { Inode } from "../../../core/middleware/graph";

export const newBooks: Inode = {
  api: async (conv, f) => await f.discovery(conv),
  conv: {
    ask: [
      'newBook.home',
    ],
  },
  switch: {
    default: 'start',
  }
};