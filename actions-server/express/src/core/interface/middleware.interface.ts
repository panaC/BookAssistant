import { IDFConv } from './dfconv.interface';
import { IsessionApiDb } from './../../app/interface/sessiondb.interface';
import { InodeTable, IintentTable, IsessionDataDb, IuserDataDb } from './../../app/interface';
import { IcontextTable } from '../../app/interface';
import { Session, User } from '../middleware/database';
import { TgraphExec } from '../middleware/graph/src/core';
import { Iapi } from '../../app/interface/api.interface';

export interface Imiddleware {
  db: {
    session: Session<IsessionDataDb, IsessionApiDb>;
    user: User<IuserDataDb>;
  };
  graph: TgraphExec;
  i18n: typeof i18n;
  table: {
    nodeTable: () => InodeTable;
    contextTable: () => IcontextTable;
    intentTable: () => IintentTable;
  };
  getValueWithStringKey: <T, R>(obj: T, name: keyof T, fallback: R) => R;
  get: <T>(url: string) => Promise<T>;
  api: Iapi;
}

// parsing - check if intent is ok
  // like arg
  // then set new node to obj graph
  // it's a preprocessing of new intent

// then launch graph machine
  // and exec and parse graph node that you want