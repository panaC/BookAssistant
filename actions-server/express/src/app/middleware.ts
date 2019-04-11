import { sessionFactory } from './../core/middleware/database';
import { userFactory } from './../core/middleware/database';
import { intentTable } from './table/intentTable';
import { contextTable } from './table/contextTable';
import { nodeTable } from './table/nodeTable';
import { Imiddleware, IDFConv } from '../core/';
import * as i18n from 'i18n';
import { exec } from '../core/middleware/graph/src/core';
import { getValueWithStringKey } from '../core/utils/getValueWithStringKey';

export type TmiddlewareFactory = (conv: IDFConv) => Promise<Imiddleware>;

/**
 * Fct to call middleware factory inside object Imiddleware
 * this object will be assign to conv: IDFConv in app.ts
 * it can see like a top factory
 * it's here you can choose middleware that will be imported
 */
export const middlewareFactory: TmiddlewareFactory = async (conv: IDFConv): Promise<Imiddleware> => ({
  db: {
    session: await sessionFactory(conv),
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
});

