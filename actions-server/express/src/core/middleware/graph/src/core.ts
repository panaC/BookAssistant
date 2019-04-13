/*
 * File: core.ts
 * Project: VoiceAssistant
 * File Created: Saturday, 30th March 2019 2:52:43 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Saturday, 30th March 2019 2:52:45 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { Inode } from './../interface/node.interface';
import { sprintf } from 'sprintf-js';
import { Suggestions, MediaObject } from 'actions-on-google';
import Axios from 'axios';
import { IDFConv } from './../../..';
import { pipe } from './../../../utils/pipe';
import { debug } from './../../../utils/debug';
import { MAE_LOOP_MAX } from './../../../constants';
import { IcontextTable, InodeTable } from '../../../../app/interface';

const translate = (str: string, conv: IDFConv): string => conv.middleware.i18n.__(str);

const getContextInTable = (conv: IDFConv, name: keyof IcontextTable) =>
      conv.middleware.getValueWithStringKey<IcontextTable, number>(
        conv.middleware.table.contextTable(),
        name, 5);

const getNodeInNodeTable = (conv: IDFConv, name: keyof InodeTable) =>
      conv.middleware.getValueWithStringKey<InodeTable, Inode>(
        conv.middleware.table.nodeTable(),
        name, conv.middleware.table.nodeTable().fallback);

const context = async (conv: IDFConv) => {
  debug.core.log(conv.node);
  if (conv.node.context) {
    if (typeof conv.node.context === 'string') {
      conv.contexts.set(conv.node.context, getContextInTable(conv, conv.node.context));
    } else {
      conv.node.context.map((v) => conv.contexts.set(v, getContextInTable(conv, v)));
    }
  }
  return conv;
};

const conversation = async (conv: IDFConv) => {
  const a = conv.node.conv;
  debug.core.log(a);
  let arg: string[] = [];

  if (a) {
    if (a.arg) {
      if (typeof a.arg === 'string') {
        arg = [a.arg];
      } else {
        arg = a.arg;
      }
    }
    if (a.ask) {
      if (typeof a.ask === 'string') {
        debug.core.log(sprintf(translate(a.ask, conv), ...arg));
        conv.ask(sprintf(translate(a.ask, conv), ...arg));
      } else {
        a.ask.map((v) => conv.ask(sprintf(translate(v, conv), ...arg)));
      }
    }
    if (a.close) {
      if (typeof a.close === 'string') {
        conv.close(sprintf(translate(a.close, conv), ...arg));
      } else {
        a.close.map((v) => conv.close(sprintf(translate(v, conv), ...arg)));
      }
    }
    if (a.suggestion) {
      if (typeof a.suggestion === 'string') {
        conv.ask(new Suggestions(sprintf(translate(a.suggestion, conv), ...arg)));
      } else {
        a.suggestion.map((v) => conv.ask(new Suggestions(sprintf(translate(v, conv), ...arg))));
      }
    }
    if (a.media) {
      conv.ask(new MediaObject(a.media));
    }
  }
  debug.core.log(conv.responses);
  return conv;
};

const api = async (conv: IDFConv) => {
  if (conv.node.api) {
    if (conv.node.api instanceof Array) {
      conv.node.api.map(async (v) => await v(conv, conv.middleware.api));
    } else {
      await conv.node.api(conv, conv.middleware.api);
    }
  }
  return conv;
};

const statistic = async (conv: IDFConv) => {
  conv.middleware.db.session.raw.push({
    date: new Date(Date.now()),
    query: conv.query,
  });
  return conv;
};

const save = async (conv: IDFConv) => {

  await conv.middleware.db.user.save();
  await conv.middleware.db.session.save();
  return conv;
};

const test = async (conv: IDFConv) => {
  const a = conv.node;
  debug.core.log('test');
  debug.core.log(conv.node);
  if (a.test && a.switch) {
    if (!a.switch.case) {
      a.switch.case = [];
    }
    debug.core.log(conv.node.test);
    debug.core.log(a.test);
    debug.core.log(typeof a.test);
    const r = a.test(conv);
    conv.node = getNodeInNodeTable(conv, a.switch.case.reduce(
      (pv, cv) => cv === r ?
        cv : pv, a.switch.default));
  } else {
    if (a.switch) {
      conv.node = getNodeInNodeTable(conv, a.switch.default);
    } else if (!a.return) {
      conv.node = {
        return: true,
        conv: {
          arg: 'error.error',
          close: 'error.global'
        }
      };
    }
  }
  return conv;
};

const p = async (conv: IDFConv) =>
  await (await pipe(context, api, conversation, test))(conv);

//
export const exec = async (conv: IDFConv, loop = 0): Promise<IDFConv> => {
  debug.core.log(conv.node);
  if (loop > MAE_LOOP_MAX) {
    conv.node = {
      return: true,
      conv: {
        arg: 'error.error',
        close: 'error.global'
      }
    };
  }
  if (conv.node.return && loop <= MAE_LOOP_MAX) {
    debug.core.log('return');
    const ret = await p(conv);
    await statistic(conv);
    await save(conv);
    return ret;
  }
  return await exec(await p(conv), ++loop);
};

export type TgraphExec = (conv: IDFConv, loop?: number) => Promise<IDFConv>;