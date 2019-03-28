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
import { convert } from 'actions-on-google/dist/service/actionssdk';

export class MaeMae {
  constructor(private _conv: DFConv) {
  }

  set state(state: Estate) {
    this._conv.session.state.state
  }

  get state() {
    return this._conv.session.state.state;
  }

  public mae(loop: number = 0): void {

    if (loop > MAE_LOOP_MAX) {
      return this._conv.utils.close(prompts.error);
    }

    const state = this._conv.session.state.state;
    if (state === Estate.start) {
      this.state = Estate.selection;
    } else if (state === Estate.welcome) {
      this.state = Estate.choice;
      return intent.welcome(this._conv);
    } else if (state === Estate.choice) {
      // return handle choice
    } else if (state >= Estate.play && state <= Estate.play_end) {
      // return mae play
    } else if (state >= Estate.toc && state <= Estate.toc_end) {
      // return mae toc
    } else if (state >= Estate.info && state <= Estate.info_end) {
      // return mae info
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