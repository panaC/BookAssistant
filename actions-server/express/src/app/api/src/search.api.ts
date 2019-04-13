import { IDFConv } from "../../../core";
import { Iwebpub } from "..";

export const search = async (conv: IDFConv, title: string, author?: string) => {
  try {
    conv.middleware.db.session.api.search = await conv.middleware.get<Iwebpub[]>(
      `https://edrlab.tk/api?q=title:${encodeURI(title)}${author !== undefined ? ` AND author:${encodeURI(author)}` : ''}`);
  } catch (e) {
    // what do here ?
  }
};