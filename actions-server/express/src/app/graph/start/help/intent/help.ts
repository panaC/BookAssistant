import {Inode} from '../../../../../core/middleware/graph';

export const help: Inode = {
  intent: true,
  name: 'start.help_intent',
  return: true,
  conv: {
    ask: [
      'help.1',
    ]
  },
};
