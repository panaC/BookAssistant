import {Iopds} from '..';
import {IDFConv} from '../../../core';

import {debug} from './../../../core/utils/debug';

export const discovery = async (conv: IDFConv) => {
  try {
    conv.middleware.db.session.api.discovery =
        await conv.middleware.get<Iopds>('https://edrlab.tk/api');
  } catch (e) {
    debug.service.log('discovery', e);
  }
};