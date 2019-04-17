import * as i18n from 'i18n';

import {IDFConv, Imiddleware} from '../core/';
import {exec} from '../core/middleware/graph/src/core';
import {getValueWithStringKey} from '../core/utils/getValueWithStringKey';

import {get} from './../core/middleware/api/src/api';
import {sessionFactory} from './../core/middleware/database';
import {userFactory} from './../core/middleware/database';
import {Iopds, Iwebpub} from './api';
import {discovery} from './api/src/discovery.api';
import {fuse} from './api/src/fuse.api';
import {getHrefWithRef, getTrackWithHref} from './api/src/ref.api';
import {search} from './api/src/search.api';
import {contextTable} from './table/contextTable';
import {intentTable} from './table/intentTable';
import {nodeTable} from './table/nodeTable';

export type TmiddlewareFactory = (conv: IDFConv) => Promise<Imiddleware>;

/**
 * Fct to call middleware factory inside object Imiddleware
 * this object will be assign to conv: IDFConv in app.ts
 * it can see like a top factory
 * it's here you can choose middleware that will be imported
 */
export const middlewareFactory: TmiddlewareFactory =
    async(conv: IDFConv): Promise<Imiddleware> => ({
  db: {
    session: await sessionFactory(conv, {
      timecode: 0,
      trackIndex: 0,
      titleTellByUser: '',
      chapterTellByUser: '',
      authorTellByUser: '',
      refTellByUser: '',
    }, {
      discovery: {} as Iopds,
      search: [] as Iwebpub[],
    }),
    user: await userFactory(conv),
  },
  graph: exec,
  i18n,
  table: {
    nodeTable,
    contextTable,
    intentTable,
  },
  getValueWithStringKey,
  get,
  api: {
    discovery,
    search,
    fuse,
    refGetHrefWithRef: getHrefWithRef,
    refGetTrackWithRef: getTrackWithHref,
  },
});
