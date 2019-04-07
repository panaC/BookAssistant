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

  static update(userInfo: UserInfo, conv: DFConv) {

    const date = new Date(Date.now());

    userInfo.lastSeen = date;
    userInfo.session.push({
      id: conv.data.sessionId,
      lastSeen: date,
    });
    ++userInfo.sessionCount;
    userInfo.locale = conv.user.locale;
  }

}
