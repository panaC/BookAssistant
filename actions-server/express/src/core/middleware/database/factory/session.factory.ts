import { DB_URL } from './../../../constants';
import { IDFConv } from "../../../interface/dfconv.interface";
import { Session } from "../src/session";
import { IsessionDataDb } from "../../../../app/interface";

export const sessionFactory = async (conv: IDFConv): Promise<Session<IsessionDataDb>> => {
  const session = new Session<IsessionDataDb>(conv.data.sessionId, DB_URL);
  await session.sync();
  session.lastSeen = new Date(Date.now());
  session.surfaceCapabilities = conv.surface.capabilities;

  return session;
};