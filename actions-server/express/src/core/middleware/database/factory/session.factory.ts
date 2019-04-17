import {Iopds, Iwebpub} from '../../../../app/api';
import {IsessionApiDb, IsessionDataDb} from '../../../../app/interface';
import {IDFConv} from '../../../interface/dfconv.interface';
import {Session} from '../src/session';

import {DB_URL} from './../../../constants';

export const sessionFactory =
    async(conv: IDFConv, data: IsessionDataDb, api: IsessionApiDb):
        Promise<Session<IsessionDataDb, IsessionApiDb>> => {
          const session = new Session<IsessionDataDb, IsessionApiDb>(
              conv.data.sessionId, DB_URL, data, api);
          await session.sync();
          session.lastSeen = new Date(Date.now());
          session.surfaceCapabilities = conv.surface.capabilities;

          return session;
        };