import {IsessionDataDb, IuserDataDb} from '../../../../app/interface';
import {IDFConv} from '../../../interface/dfconv.interface';
import {Session} from '../src/session';
import {User} from '../src/user';

import {DB_URL} from './../../../constants';

export const userFactory = async(conv: IDFConv, data: IuserDataDb): Promise<User<IuserDataDb>> => {
  const user = new User<IuserDataDb>(conv.user.storage.userId, DB_URL, data);
  await user.sync();

  return user;
};