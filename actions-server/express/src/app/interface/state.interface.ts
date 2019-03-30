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

interface IstateName {
  fct: () => string;
  switch: {
    [result: string]: string;
    default: string;
  }
  return: boolean;
  conv: {
    ask: string | string[];
    close: string;
    suggestion: string | string[];
  }
  children: Istate[];
}

export interface Istate {
  [context: string]: {
    [state: string]: IstateName;
    fallback: IstateName;
    no_input: IstateName;
  }
}