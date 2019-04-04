import { INTENT_START_NAME } from './../constants';
import { Capabilities } from 'actions-on-google/dist/service/actionssdk';
import { Isession, IrawInput } from './interface/session.interface';
import { DFConv } from './../app/app';
import { Io } from './io';
import { Inode } from '../interface/node.interface';

export class Session<T = {}> extends Io<Isession> implements Isession {

  lastSeen: Date = new Date();
  surfaceCapabilities: Capabilities = {} as Capabilities;
  raw: IrawInput[];
  data: T;

  constructor(id: string, db: string, public node: Inode) {
    super(id, db, 'session');

    this.raw = [];
    this.data = {} as T;
  }

  static update(session: Session, conv: DFConv) {

    const date = new Date(Date.now());

    session.lastSeen = date;
    session.surfaceCapabilities = conv.surface.capabilities;
  }

}
