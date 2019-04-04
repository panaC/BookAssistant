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

import { Istate, Igraph } from '../interface/state.interface';
import { state } from '../app/state';
import { DFConv } from '../app/app';
import { MAE_LOOP_MAX } from './../constants';
import * as i18n from 'i18n';
import { join } from 'path';
import { debug } from './../utils/debug';

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

export class Core {

  // private _state: Istate = state;
  /* private _currentState: IstateName = {
    switch: {
      default: '',
    }
  };*/
  // private _currentResult = '';

  constructor(public _conv: DFConv, public _graph: Igraph) {

  }

  set state(s: string) {
    this._conv.session.state = s;
  }

  get state() {
    return this._conv.session.state;
  }

  private findState(): Istate {
    let path = this.state;
    path = path.replace(/\./gi, '.children.');
    if (path === '') {
      path = 'start';
    }

    debug.core.log('path:', path);

    try {
      return eval(`this._graph.${path}`) || this._graph.error;
    } catch {
      return this._graph.error;
    }
  }

  private async exec(state: Istate): Promise<string> {
    if (state.test) {
      if (typeof state.test === 'function') {
        // handle if function is async
        return state.test(this._conv);
      }
    }
    return '';
  }

  private switch(state: Istate, ): void {
    if (this._currentState.switch[this._currentResult]) {
      this.state = this._currentState.switch[this._currentResult] as string;
    } else {
      this.state = this._currentState.switch.default;
    }
    debug.core.log('switch:', this.state);
  }

  private convHandle(): void {
    // handle all conv object in state
    const conv = this._currentState.conv;
    if (conv) {
      if (conv.ask) {
        this._conv.ask(translate(conv.ask as string));
      }
      if (conv.close) {
        this._conv.close(translate(conv.close));
      }
    }
  }

  private stat(): void {
    this._conv.session.raw.push({
      date: new Date(Date.now()),
      state: this.state,
      query: this._conv.query,
    });
  }

  async main(loop = 0): Promise<void> {

    if (loop > MAE_LOOP_MAX) {
      this._conv.close('error loop');
      return;
    }

    // await this._conv.session.waitInit;

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

    debug.core.log('main:start');

    this.stat();

    this.findState();
    await this.execFct();
    this.execSwitch();
    this.convHandle();

    if (!this._currentState.return) {
      debug.core.log('main:end-loop');
      return this.main(++loop);
    }

    if (this._currentState.context) {
      debug.core.log('context-set:', this._currentState.context);
      this._conv.contexts.set(this._currentState.context as string, 10);
    }

    debug.core.log('main:end');

    await this._conv.session.save();
    await this._conv.userInfo.save();
  }
}
