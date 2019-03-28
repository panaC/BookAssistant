import { MAE_LOOP_MAX } from './../../constants';
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

export class MaeMae {
  constructor(private _conv: DFConv) {
  }

  public mae(loop: number = 0) {

    if (loop > MAE_LOOP_MAX) {
      // return conv.close error
    }

    const state = this._conv.session.state.state;
    if (state === Estate.start) {

    } else if (state === Estate.session) {

    } else if (state === Estate.choice) {

    } else if (state >= Estate.play && state <= Estate.play_end) {

    } else if (state >= Estate.toc && state <= Estate.toc_end) {

    } else if (state >= Estate.info && state <= Estate.info_end) {

    } else if (state === Estate.fallback) {

    } else if (state === Estate.no_input) {

    } else if (state === Estate.goodbye) {
      
    } else {

    }
  }
}