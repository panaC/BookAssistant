import { DB_URL } from './../../../constants';
import { IDFConv } from "../../../interface/dfconv.interface";
import { Session } from "../src/session";
import { IsessionDataDb, IuserDataDb } from "../../../../app/interface";
import { User } from '../src/user';

export const userFactory = async (conv: IDFConv): Promise<User<IuserDataDb>> => {
  const user = new User<IuserDataDb>(conv.user.storage.userId, DB_URL);
  await user.sync();

  return user;
};