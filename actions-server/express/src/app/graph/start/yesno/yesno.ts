import { Inode } from './../../../../core/middleware/graph';
import { InodeTable } from '../../../interface';

export const get: Inode = {
  intent: true,
  name: 'yesno.get_intent',
  return: false,
  test: (conv) => {
    // tslint:disable-next-line:ban
    conv.middleware.db.session.data.context.choice = parseInt(conv.parameters.yesno as string, 10);
    const param = conv.contexts.get('yesno');
    if (param) {
      // add check if param return is not corrupted
      return param.parameters.return as keyof InodeTable;
    }
    return "choice.control.error";
  }
};