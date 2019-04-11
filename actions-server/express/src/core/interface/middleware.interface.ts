import { InodeTable, IintentTable, IsessionDataDb, IuserDataDb } from './../../app/interface';
import { IcontextTable } from '../../app/interface';
import { Session, User } from '../middleware/database';
import { graphExec } from '../middleware/graph/src/core';

export interface Imiddleware {
  db: {
    session: Session<IsessionDataDb>;
    user: User<IuserDataDb>;
  };
  graph: graphExec;
  i18n: typeof i18n;
  table: {
    nodeTable: () => InodeTable;
    contextTable: () => IcontextTable;
    intentTable: () => IintentTable;
  };
  getValueWithStringKey: <T, R>(obj: T, name: keyof T, fallback: R) => R;
}

// parsing - check if intent is ok
  // like arg
  // then set new node to obj graph
  // it's a preprocessing of new intent

// then launch graph machine
  // and exec and parse graph node that you want