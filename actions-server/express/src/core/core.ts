import { debug } from './../utils/debug';
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
import { DFConv } from '../app/app';
import { MAE_LOOP_MAX } from './../constants';
import * as i18n from 'i18n';
import { join } from 'path';
import Axios from 'axios';
import { pipe } from '../utils/pipe';

i18n.configure({
  directory: join(__dirname, '../locales'),
  objectNotation: true,
  fallbacks: {
    'fr-FR': 'fr',
    'fr-CA': 'fr',
    'en-US': 'en',
    'en-GB': 'en',
  },
  defaultLocale: 'fr',
});

export const translate = (str: string): string => i18n.__(str);

export const setLocale = (local: string) => { i18n.setLocale(local); };

const context = async (conv: DFConv) => {
  if (conv.session.node.context) {
    if (typeof conv.session.node.context === 'string') {
      conv.contexts.set(conv.session.node.context, 1);
    } else {
      conv.session.node.context.map((v) => conv.contexts.set(v, 1));
    }
  }
  return conv;
};

const conversation = async (conv: DFConv) => {
  const a = conv.session.node.conv;
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

  if (conv.session.node.http) {
    if (conv.session.node.http instanceof Array) {
      conv.session.node.http.map(async (v) => await request(v, conv));
    } else {
      await request(conv.session.node.http, conv);
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
  const a = conv.session.node;
  if (a.test && a.switch) {
    if (!a.switch.case) {
      a.switch.case = [];
    }
    const r = a.test(conv);
    conv.session.node = a.switch.case.reduce(
      (pv, cv) => cv.value === r ?
          cv.node : pv, a.switch.default);
  } else {
    if (a.switch) {
      conv.session.node = a.switch.default;
    } else if (!a.return) {
      conv.session.node = {
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
  await (await pipe(context, http, test, conversation, statistic, save))(conv);

//
export const exec = async (conv: DFConv, loop = 0): Promise<DFConv> => {
  debug.core.log(conv.session.node);
  if (loop > MAE_LOOP_MAX) {
    conv.session.node = {
      return: true,
      conv: {
        arg: 'error.error',
        close: 'error.global'
      }
    };
  }
  if (conv.session.node.return && loop <= MAE_LOOP_MAX) {
    debug.core.log('return');
    return await p(conv);
  }
  return await exec(await p(conv), ++loop);
};