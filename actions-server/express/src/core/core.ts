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

import { Ihttp } from './../interface/node.interface';
import { sprintf } from 'sprintf-js';
import { Suggestions, MediaObject } from 'actions-on-google';
import { DFConv, getNodeInSymbolTable, i18nConfigure } from '../app/app';
import { MAE_LOOP_MAX } from './../constants';
import * as i18n from 'i18n';
import Axios from 'axios';
import { pipe } from '../utils/pipe';
import { debug } from './../utils/debug';

i18n.configure(i18nConfigure);

export const translate = (str: string): string => i18n.__(str);

export const setLocale = (local: string) => { i18n.setLocale(local); };

const context = async (conv: DFConv) => {
  debug.core.log(conv.node);
  if (conv.node.context) {
    if (typeof conv.node.context === 'string') {
      conv.contexts.set(conv.node.context, 1);
    } else {
      conv.node.context.map((v) => conv.contexts.set(v, 1));
    }
  }
  return conv;
};

const conversation = async (conv: DFConv) => {
  const a = conv.node.conv;
  debug.core.log(a);
  let arg: string[] = [];

  if (a) {
    if (a.arg) {
      if (typeof a.arg === 'string') {
        arg = [ a.arg ];
      } else {
        arg = a.arg;
      }
    }
    if (a.ask) {
      if (typeof a.ask === 'string') {
        debug.core.log(sprintf(translate(a.ask), ...arg));
        conv.ask(sprintf(translate(a.ask), ...arg));
      } else {
        a.ask.map((v) => conv.ask(sprintf(translate(v), ...arg)));
      }
    }
    if (a.close) {
      if (typeof a.close === 'string') {
        conv.close(sprintf(translate(a.close), ...arg));
      } else {
        a.close.map((v) => conv.close(sprintf(translate(v), ...arg)));
      }
    }
    if (a.suggestion) {
      if (typeof a.suggestion === 'string') {
        conv.ask(new Suggestions(sprintf(translate(a.suggestion), ...arg)));
      } else {
        a.suggestion.map((v) => conv.ask(new Suggestions(sprintf(translate(v), ...arg))));
      }
    }
    if (a.media) {
      conv.ask(new MediaObject(a.media));
    }
  }
  debug.core.log(conv.responses);
  return conv;
};

const http = async (conv: DFConv) => {

  const request = async (o: Ihttp, conv: DFConv) => {
    if (o.url) {
      try {
        o.compute(await Axios(o.url, o), conv);
      } catch (e) {
        o.error(e, conv);
      }
    }
  };

  if (conv.node.http) {
    if (conv.node.http instanceof Array) {
      conv.node.http.map(async (v) => await request(v, conv));
    } else {
      await request(conv.node.http, conv);
    }
  }
  return conv;
};

export const statistic = async (conv: DFConv) => {
  conv.session.raw.push({
    date: new Date(Date.now()),
    query: conv.query,
  });
  return conv;
};

export const save = async (conv: DFConv) =>{

  await conv.session.save();
  await conv.userInfo.save();
  return conv;
};


export const test = async (conv: DFConv) => {
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
    conv.node = getNodeInSymbolTable(a.switch.case.reduce(
      (pv, cv) => cv === r ?
          cv : pv, a.switch.default));
  } else {
    if (a.switch) {
      conv.node = getNodeInSymbolTable(a.switch.default);
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

const p = async (conv: DFConv) =>
  await (await pipe(context, http, conversation, statistic, test, save))(conv);

//
export const exec = async (conv: DFConv,  loop = 0): Promise<DFConv> => {
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
    debug.core.log(conv.node);
    return await p(conv);
  }
  return await exec(await p(conv), ++loop);
};