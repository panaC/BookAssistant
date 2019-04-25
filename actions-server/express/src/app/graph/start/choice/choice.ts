import { debug } from './../../../../core/utils/debug';
import { Inode } from './../../../../core/middleware/graph';
import { InodeTable } from '../../../interface';

export const getNumberIntent: Inode = {
  return: false,
  name: 'choice.getNumber_intent',
  intent: true,
  test: (conv) => {
    // tslint:disable-next-line:ban
    conv.middleware.db.session.data.context.choice = parseInt(conv.parameters.choice as string, 10);
    debug.app.log('getNumber choice:', conv.middleware.db.session.data.context.choice);
    const param = conv.contexts.get('choice');
    if (param) {
      // add check if param return is not corrupted
      return param.parameters.return as keyof InodeTable;
    }
    return "choice.control.error";
  }
};