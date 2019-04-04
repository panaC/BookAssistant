import { Ihttp } from './../interface/node.interface';
import { sprintf } from 'sprintf-js';
import { Suggestions, MediaObject } from 'actions-on-google';
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

import { DFConv } from '../app/app';
import { MAE_LOOP_MAX } from './../constants';
import * as i18n from 'i18n';
import { join } from 'path';
import { debug } from './../utils/debug';
import { error } from '../app/graph/graph';
import Axios from 'axios';
import { AxiosRequestConfig } from 'axios';
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
        conv.ask(translate(sprintf(a.ask, ...arg)));
      } else {
        a.ask.map((v) => conv.ask(translate(sprintf(v, ...arg))));
      }
    }
    if (a.close) {
      if (typeof a.close === 'string') {
        conv.close(translate(sprintf(a.close, ...arg)));
      } else {
        a.close.map((v) => conv.close(translate(sprintf(v, ...arg))));
      }
    }
    if (a.suggestion) {
      if (typeof a.suggestion === 'string') {
        conv.ask(new Suggestions(sprintf(a.suggestion, ...arg)));
      } else {
        a.suggestion.map((v) => conv.ask(new Suggestions(sprintf(v, ...arg))));
      }
    }
    if (a.media) {
      conv.ask(new MediaObject(a.media));
    }
  }
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

export const statistic = async (conv: DFConv) =>
  conv.session.raw.push({
      date: new Date(Date.now()),
      query: conv.query,
    });

export const save = async (conv: DFConv): DFConv =>
    conv.session.save() && conv.userInfo.save() && conv;


export const test = async (conv: DFConv) => {
  const a = conv.session.node;
  if (a.test && a.switch) {
    if (!a.switch.case) {
      a.switch.case = [];
    }
    conv.session.node = a.switch.case.reduce(
      (pv, cv) =>
        a.test && cv.value === a.test(conv) ?
          cv.node : pv, a.switch.default);
  }
};

//
export const exec = async (conv: DFConv, loop = 0) => {
  if (loop > MAE_LOOP_MAX) {
    conv.session.node = error;
  }
  pipe(context, conversation, http)

  if (!conv.session.node.return && loop <= MAE_LOOP_MAX) {
    exec(conv, ++loop);
  }
};