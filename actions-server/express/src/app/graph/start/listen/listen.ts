import {Inode} from '../../../../core/middleware/graph';

// starting point for listen
export const start: Inode = {
  intent: true,
  name: 'start.listen_intent',
  return: false,
  /*
  // listen context is actually doesn't used
  // the alone return node is play.play
  context: {
    name: 'listen',
  },
  */
  test: () => 'listen.getBook'
};
