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

export interface IstateName {
  context?: string | string[];

  // declare var used
  // var?: Ivar;

  // http request requisite
  // http?: Ihttp | Ihttp[];

  // variable to compute
  // compute?: string | string[];

  // handle multiple string for apply a map-reduce logic in fct -> return a concatenation string
  // accept in fct : variable name or function name, type test before execution
  test?: string | string[];
  // only default switch state is required
  switch: {
    // Option :
    // allow to add multiple context name with string[]
    [result: string]: string /*| string[]*/;
    default: string;
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
  children?: IstateChildren;
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
  save: {
    [name: string]: string;
  };
}

export interface Ivar {
  [name: string]: {
    // false by default for session else it's saved in userInfo
    persistence: boolean;
    array: boolean;
    init: string;
  };
}

export interface IstateChildren {
  [state: string]: IstateName;
}

export interface Istate {
  [state: string]: IstateName;
  fallback: IstateName;
  no_input: IstateName;
  error: IstateName;
}

/*
export interface Istate {
  [state: string]: IstateContext;
  // default context if a stateName is unknown
  default: IstateContext;
}
*/