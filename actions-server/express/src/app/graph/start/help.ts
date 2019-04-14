import { Inode } from "../../../core/middleware/graph";

export const help: Inode = {
  return: true,
  context: 'start',
  conv: {
    ask: [
      'help.1',
      'help.2',
      'help.3',
      'welcome.home'
    ]
  }
};