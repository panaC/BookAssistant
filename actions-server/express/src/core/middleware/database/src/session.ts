import { Capabilities } from 'actions-on-google/dist/service/actionssdk';
import { Isession, IrawInput } from '../interface/session.interface';
import { Io } from './io';

export class Session<T = {}, R = {}> extends Io<Isession> implements Isession {

  lastSeen: Date = new Date();
  surfaceCapabilities: Capabilities = {} as Capabilities;
  raw: IrawInput[];
  data: T;
  api: R;
  lostMemory: boolean;

  /**
   * 
   * @param id session unique id
   * @param db couchdb url
   * @param state symbol description name to init state by default
   */
  constructor(id: string, db: string, data: T, api: R) {
    super(id, db, 'session');
    this.raw = [];
    this.data = data;
    this.api = api;
    this.lostMemory = false;
  }
}
