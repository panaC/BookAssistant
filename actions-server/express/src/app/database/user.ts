import { DFConv } from './../app';
import { Iuser } from './interface/user.interface';
import { IuserSession } from './interface/user.interface';
import { Io } from './io';

export class User extends Io<Iuser> implements Iuser {

  public lastSeen: Date;
  public sessionCount: number;
  public locale: string;
  public session: IuserSession[];
  public data: any;

  constructor(id: string, db: string, conv: DFConv) {
    super(id, db, 'user');

    const date = new Date(Date.now());

    this.lastSeen = date;
    this.sessionCount = 0;
    this.locale = conv.user.locale;
    this.session = [];
    this.session.push({
      id,
      lastSeen: date,
    });
    this.data = {};
  }

}

