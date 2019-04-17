import {IDFConv} from '../../../core';
import {Inode} from '../../../core/middleware/graph';
import { Parameters } from 'actions-on-google';
import { InodeTable } from '../../interface';

interface Iparam extends Parameters {
  title: string;
  author?: string;
  reference?: string;
  chapter?: string;
}

export const listen: Inode = {
  return: true,
  context: 'listen',
  test: async (conv: IDFConv): Promise<keyof InodeTable> => {
    const {title, author, reference, chapter}: Iparam = conv.parameters as Iparam;
    await conv.middleware.api.search(conv, title, author);
    conv.middleware.db.session.data.titleTellByUser = title;
    conv.middleware.db.session.data.authorTellByUser = author || '';
    conv.middleware.db.session.data.refTellByUser = reference || '';
    conv.middleware.db.session.data.chapterTellByUser = chapter || '';
    if (conv.middleware.db.session.api.search.length > 1) {
      /**
       * redirect to select num of book in the list
       */
    } else if (conv.middleware.db.session.api.search.length === 1) {
      /**
       * saved url and timecode and redirect to play
       */
    }
    /**
     * redirect to fallback
     */
    return 'fallback';
  },
  conv: {
    arg: (conv: IDFConv): string[] =>
      [conv.parameters.title as string, conv.parameters.author as string,
         conv.parameters.reference as string],
    ask: 'listen.book',
  }
};