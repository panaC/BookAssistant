import { DFConv } from './../app/app';
import { Iuser } from './interface/user.interface';
import { IuserSession } from './interface/user.interface';
import { Io } from './io';

export class UserInfo<T = {}> extends Io<Iuser> implements Iuser {

  public lastSeen!: Date;
  public sessionCount: number;
  public locale!: string;
  public session: IuserSession[];
  public data: T;

  constructor(id: string, db: string) {
    super(id, db, 'user');

    this.sessionCount = 0;
    this.session = [];
    this.data = {} as T;
  }

  update(conv: DFConv) {

    const date = new Date(Date.now());

    this.lastSeen = date;
    this.session.push({
      id: conv.data.sessionId,
      lastSeen: date,
    });
    ++this.sessionCount;
    this.locale = conv.user.locale;
  }

}

// EOF