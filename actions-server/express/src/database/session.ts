import { INTENT_START_NAME } from './../constants';
import { Capabilities } from 'actions-on-google/dist/service/actionssdk';
import { Isession, IrawInput } from './interface/session.interface';
import { DFConv } from './../app/app';
import { Io } from './io';

export class Session extends Io<Isession> implements Isession {

  public lastSeen: Date;
  public surfaceCapabilities: Capabilities;
  public raw: IrawInput[];
  public state: string;
  public data: any;

  constructor(id: string, db: string) {
    super(id, db, 'session');

    this.raw = [];
    this.state = INTENT_START_NAME;
    this.data = {};
  }

  static update(session: Session, conv: DFConv) {

    const date = new Date(Date.now());

    session.lastSeen = date;
    session.surfaceCapabilities = conv.surface.capabilities;
  }

}
