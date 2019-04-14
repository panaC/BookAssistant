import { Inode } from "../../../core/middleware/graph";

export const help: Inode = {
  return: true,
  conv: {
    ask: [
      'help.1',
      'welcome.home'
    ]
  },
  switch: {
    default: 'start',
  },
};