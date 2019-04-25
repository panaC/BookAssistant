import { Inode } from './../../../../core/middleware/graph';
import { InodeTable } from '../../../interface';

export const getYesIntent: Inode = {
  intent: true,
  name: 'yesno.getYes_intent',
  return: false,
  test: (conv) => {
    // tslint:disable-next-line:ban
    conv.middleware.db.session.data.context.yes_no = true;
    const param = conv.contexts.get('yesno');
    if (param) {
      // add check if param return is not corrupted
      return param.parameters.return as keyof InodeTable;
    }
    conv.middleware.db.session.data._error = 'Yes-no context parameter not found';
    return "choice.control.error";
  }
};

export const getNoIntent: Inode = {
  intent: true,
  name: 'yesno.getNo_intent',
  return: false,
  test: (conv) => {
    // tslint:disable-next-line:ban
    conv.middleware.db.session.data.context.yes_no = false;
    const param = conv.contexts.get('yesno');
    if (param) {
      // add check if param return is not corrupted
      return param.parameters.return as keyof InodeTable;
    }
    conv.middleware.db.session.data._error = 'Yes-no context parameter not found';
    return "choice.control.error";
  }
};