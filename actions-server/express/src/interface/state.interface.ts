/*
 * File: state.interface.ts
 * Project: VoiceAssistant
 * File Created: Saturday, 30th March 2019 10:44:40 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Saturday, 30th March 2019 10:44:43 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { DFConv } from './../app/app';

export interface Istate {
  context?: string | string[];

  http?: Ihttp | Ihttp[];

  // add function directly but i can't use json in config file but only ts files
  test?: (conv: DFConv) => string;
  // only default switch state is required
  switch: {
    // possibly add more state for more context switch
    [state: string]: Istate /*| Istate[]*/;
    default: Istate;
  };

  conv?: {
    arg?: string | string[];
    ask?: string | string[];
    close?: string;
    media?: Imedia;
    suggestion?: string | string[];
  };

  // no by default
  return?: boolean;
  children?: {
    [name: string]: Istate;
  };
}

export interface Imedia {
  name: string;
  url: string;
  description: string;
  author: string;
  img: {
    url: string;
    alt: string;
  };
}

export interface Ihttp {
  url: string;
  type: string;
  body: string;
  header: string;
  // tslint:disable-next-line:no-any
  data: (data: any, conv: DFConv) => void;
}

export interface Igraph {
  start: Istate;
  [name: string]: Istate;
  fallback: Istate;
  no_input: Istate;
  error: Istate;
}
