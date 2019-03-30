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

import { Istate, IstateName } from "../interface/state.interface";
import { state } from "../state/state";
import { DFConv } from './../app';
import { MAE_LOOP_MAX } from './../../constants';

export class Core {

  private _state: Istate = state;
  private _currentState: IstateName = null;
  private _currentResult: string = '';

  constructor(public _conv: DFConv) {
  }

  set state(state: string) {
    this._conv.data.state = state;
  }

  get state() {
    return this._conv.data.state;
  }

  private findState(): void {
    const path = this.state;
    path.replace(/\./gi, '.children.');
    this._currentState = this._state[path] || this._state.error;
  }

  private async execFct() {
    if (this._currentState.fct) {
      // https://stackoverflow.com/questions/49525389/element-implicitly-has-an-any-type-because-type-0-has-no-index-signature
      const tmp = eval(`this._conv.${this._currentState.fct}`);
      this._currentResult = '';
      if (typeof tmp === 'function') {
        // handle if function is async
        this._currentResult = tmp();
      } else if (typeof tmp === 'string') {
        this._currentResult = tmp;
      }
    }
  }

  private execSwitch(): void {
    if (this._currentState.switch[this._currentResult]) {
      this.state = this._currentState.switch[this._currentResult] as string;
    } else {
      this.state = this._currentState.switch.default;
    }
  }

  private convHandle(): void {
    // handle all conv object in state
    const conv = this._currentState.conv;
    if (conv) {
      if (conv.ask) {
        this._conv.ask(conv.ask as string);
      }
      if (conv.close) {
        this._conv.close(conv.close);
      }
    }
  }

  public async main(loop: number = 0): Promise<void> {

    if (loop > MAE_LOOP_MAX) {
      this._conv.close('error loop');
      return;
    }

    /*
     * 1/ found in graph the stateName
          logic context.context.context.name
          a name become a context when it have at least one children
     * 2/ exec the fcts if exists
     * 3/ save the state name in function of string returned
     * 4/ set the conv.ask / close / suggestion
     * 5/ if return is set : quit recursive loop
     *      else call main with loop increment (recursive mode)
     * 6/ end
     */

    this.findState();
    this.execFct();
    this.execSwitch();
    this.convHandle();

    if (!this._currentState.return) {
      return this.main(++loop);
    }
    // await this._conv.session.save();
  }
}