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

  /**
   * 
   * @param id session unique id
   * @param db couchdb url
   * @param state symbol description name to init state by default
   */
  constructor(id: string, db: string) {
    super(id, db, 'session');
    this.raw = [];
    this.data = {} as T;
  }

  update(conv: DFConv) {

    const date = new Date(Date.now());

    this.lastSeen = date;
    this.surfaceCapabilities = conv.surface.capabilities;
  }

}
