import { debug } from './../../../core/utils/debug';
import { IDFConv } from "../../../core";
import { Iopds } from "..";

export const discovery = async (conv: IDFConv) => {
  try {
    conv.middleware.db.session.api.discovery = await conv.middleware.get<Iopds>('https://edrlab.tk/api');
  } catch(e) {
    debug.service.log('discovery', e);
  }
};