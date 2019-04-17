import {Iuser} from '../interface/user.interface';
import {IuserSession} from '../interface/user.interface';

import {IDFConv} from './../../../interface/dfconv.interface';
import {Io} from './io';

export class User<T = {}> extends Io<Iuser> implements Iuser {
  lastSeen!: Date;
  sessionCount: number;
  locale!: string;
  session: IuserSession[];
  data: T;
  lostMemory: boolean;

  constructor(id: string, db: string) {
    super(id, db, 'user');

    this.sessionCount = 0;
    this.session = [];
    this.data = {} as T;
    this.lostMemory = false;
  }

  update(conv: IDFConv) {
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