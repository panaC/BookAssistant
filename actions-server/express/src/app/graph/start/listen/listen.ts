import {Inode} from '../../../../core/middleware/graph';

// starting point for listen
export const start: Inode = {
  name: 'start.listen_intent',
  intent: true,
  return: false,
  test: () => 'listen.getBook'
};
