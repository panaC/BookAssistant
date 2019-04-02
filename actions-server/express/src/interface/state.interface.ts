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
  // handle multiple string for apply a map-reduce logic in fct -> return a concatenation string
  // accept in fct : variable name or function name, type test before execution
  fct?: string | string[];
  // only default switch state is required
  switch: {
    // allow to add multiple context name with string[]
    [result: string]: string | string[];
    default: string;
  }
  conv?: {
    arg?: string | string[];
    ask?: string | string[];
    close?: string;
    suggestion?: string | string[];
  }
  // no by default
  return?: boolean;
  children?: IstateChildren;
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