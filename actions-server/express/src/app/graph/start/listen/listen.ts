import {Inode} from '../../../../core/middleware/graph';

// starting point for listen
export const start: Inode = {
  intent: true,
  name: 'start.listen_intent',
  return: false,
  context: {
    name: 'listen',
  },
  test: () => 'listen.getBook'
};
