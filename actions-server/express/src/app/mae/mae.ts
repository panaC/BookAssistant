/*
 * File: core.ts
 * Project: VoiceAssistant
 * File Created: Thursday, 28th March 2019 5:34:33 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Thursday, 28th March 2019 5:34:37 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { DFConv } from '../app';
import { Estate } from './state';
import { prompts } from '../prompt';
import { MAE_LOOP_MAX } from './../../constants';
import { intent } from '../intent/intent';
import { Imae } from './interface/mae.interface';

export const maeFactory = (fct: (conv: DFConv) => void): Imae => {
  const factory = <Imae>fct;
  factory.getState = () => 
  return factory;
}

export class MaeMae {
  constructor(private _conv: DFConv) {
  }

  set state(state: Estate) {
    this._conv.session.state.state = state;
  }

  get state() {
    return this._conv.session.state.state;
  }

  public mae(loop: number = 0): void {

    // blocking infernal recursive loop
    if (loop > MAE_LOOP_MAX) {
      return this._conv.utils.close(prompts.error);
    }

    const state = this.state;

    // Mae
    if (state === Estate.start) {
      this.state = Estate.welcome;
      return this.mae(++loop);

    } else if (state === Estate.welcome) {
      this.state = Estate.main;
      return intent.welcome(this._conv);

    } else if (state >= Estate.main && state <= Estate.main_end) {
      // return handle choice
      return main(this._conv, loop);

    } else if (state === Estate.fallback) {
      // doesn't used, wired in dialogflog

    } else if (state === Estate.no_input) {
      return intent.noInput(this._conv);

    } else if (state === Estate.goodbye) {
      return intent.goodbye(this._conv);

    } else {
      // change this message
      return this._conv.utils.close(prompts.error);

    }
  }
}

