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

import {MediaObject, Suggestions} from 'actions-on-google';
import {sprintf} from 'sprintf-js';

import {IcontextTable, InodeTable} from '../../../../app/interface';

import {IDFConv} from './../../..';
import {MAE_LOOP_MAX} from './../../../constants';
import {debug} from './../../../utils/debug';
import {pipe} from './../../../utils/pipe';
import {Inode} from './../interface/node.interface';

const translate = (str: string, conv: IDFConv): string =>
    conv.middleware.i18n.__(str);

const getContextInTable = (conv: IDFConv, name: keyof IcontextTable) =>
    conv.middleware.getValueWithStringKey<IcontextTable, number>(
        conv.middleware.table.contextTable(), name, 5);

const getNodeInNodeTable = (conv: IDFConv, name: keyof InodeTable) =>
    conv.middleware.getValueWithStringKey<InodeTable, Inode>(
        conv.middleware.table.nodeTable(), name,
        conv.middleware.table.nodeTable().fallback_intent);

const context = async (conv: IDFConv) => {
  debug.core.log(conv.node);
  if (conv.node.context) {
    if (typeof conv.node.context.name === 'string') {
      conv.contexts.set(
          conv.node.context.name, getContextInTable(conv, conv.node.context.name), conv.node.context);
    } else {
      /**
       * Disable array context
       */
      /*
      conv.node.context.map(
          (v) => conv.contexts.set(v, getContextInTable(conv, v)));
      */
    }
  }
  return conv;
};

const conversation = async (conv: IDFConv) => {
  const a = conv.node.conv;
  debug.core.log(a);
  let arg: string[] = [];
  debug.core.log(arg);

  if (a) {
    if (a.arg) {
      debug.core.log(a.arg);
      try {
        const _arg = a.arg(conv);
        debug.core.log(typeof _arg, _arg);
        if (typeof _arg === 'string') {
          arg = [_arg];
          debug.core.log(arg);
        } else {
          arg = _arg;
          debug.core.log(arg);
        }
      } catch (e) {
        // log arg error
        debug.core.log(e);
      }
      debug.core.log('conv arg:', Object.keys(arg));
      debug.core.log(arg);
    }
    if (a.ask) {
      if (typeof a.ask === 'string') {
        debug.core.log('ask');
        conv.ask(sprintf(translate(a.ask, conv), ...arg));
      } else {
        /* disable array map */
        // a.ask.map((v) => conv.ask(sprintf(translate(v, conv), ...arg)));
        /* enable random ask in array */
        conv.ask(sprintf(
            translate(a.ask[(Math.random() * a.ask.length) | 0], conv),
            ...arg));
      }
    }
    if (a.close) {
      if (typeof a.close === 'string') {
        debug.core.log('a.close', a.close);
        conv.close(sprintf(translate(a.close, conv), ...arg));
      } else {
        /* disable array map */
        // a.close.map((v) => conv.close(sprintf(translate(v, conv), ...arg)));
        /* enable random ask in array */
        conv.close(sprintf(
            translate(a.close[(Math.random() * a.close.length) | 0], conv),
            ...arg));
      }
    }
    if (a.suggestion) {
      if (typeof a.suggestion === 'string') {
        conv.ask(
            new Suggestions(sprintf(translate(a.suggestion, conv), ...arg)));
      } else {
        a.suggestion.map(
            (v) =>
                conv.ask(new Suggestions(sprintf(translate(v, conv), ...arg))));
      }
    }
    if (a.media) {
      conv.ask(new MediaObject(a.media(conv)));
    }
  }
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
  const pr1 = conv.middleware.db.user.save();
  const pr2 = conv.middleware.db.session.save();
  await pr1;
  await pr2;
  return conv;
};

const test = async (conv: IDFConv) => {
  const a = conv.node;
  debug.core.log('test');
  debug.core.log(conv.node);
  if (a.test) {
    debug.core.log(conv.node.test);
    debug.core.log(a.test);
    debug.core.log(typeof a.test);
    try {
      const r = await Promise.resolve(a.test(conv));
      conv.node = getNodeInNodeTable(
        conv,
        r);
    } catch (e) {
      conv.node = {
        return: true, conv: { arg: () => e.toString(), close: 'error.global' }
      };
    }
  }
  return conv;
};

const p = async (conv: IDFConv) =>
    await (await pipe(context, api, conversation, test))(conv);

//
export const exec = async(conv: IDFConv, loop = 0): Promise<IDFConv> => {
  debug.core.log(conv.node);
  if (loop > MAE_LOOP_MAX) {
    conv.node = {
      return: true, conv: {arg: () => 'error.error', close: 'error.global'}
    };
  }
  if (conv.node.return && loop <= MAE_LOOP_MAX) {
    debug.core.log('return');
    const ret = await p(conv);
    await statistic(conv);
    await save(conv);
    debug.core.log('RETURN');
    delete ret.middleware;
    return ret;
  }
  return await exec(await p(conv), ++loop);
};

export type TgraphExec = (conv: IDFConv, loop?: number) => Promise<IDFConv>;