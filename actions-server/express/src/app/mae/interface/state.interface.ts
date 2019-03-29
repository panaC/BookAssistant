/*
 * File: state.interface.ts
 * Project: VoiceAssistant
 * File Created: Friday, 29th March 2019 11:16:44 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Friday, 29th March 2019 11:16:55 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { Estate } from './../state';
import { DFConv } from '../../app';

export interface Istate {
  name: string,
  state: Estate,
  range: {
    start: Estate,
    end: Estate,
  },
  fct: (conv: DFConv, loop: number) => void,
  children : Istate[],
}