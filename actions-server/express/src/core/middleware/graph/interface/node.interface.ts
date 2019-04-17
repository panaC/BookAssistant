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

import {MediaObjectOptions} from 'actions-on-google';

import {Iapi} from '../../../../app/interface/api.interface';

import {IDFConv} from './../../../';
import {IcontextTable, InodeTable} from './../../../../app/interface';

export type Tapi = (conv: IDFConv, f: Iapi) => Promise<void>;
export type Ttest = (conv: IDFConv) => keyof InodeTable;
export type TtestPromise = (conv: IDFConv) => Promise<keyof InodeTable>;

export interface Inode {
  // Symbol name
  name?: keyof InodeTable;
  intent?: boolean;
  context?: keyof IcontextTable|Array<keyof IcontextTable>;

  api?: Tapi[]|Tapi;

  // add function directly but i can't use json in config file but only ts files
  test?: Ttest | TtestPromise;
  // only default switch state is required

  // use reduce here with init = default and [] = case
  switch?: {
    // possibly add more state for more context switch
    case?: Array<keyof InodeTable>; default: keyof InodeTable;
  };
  conv?: {
    // at most two 'simple_responses' are supported
    arg?: (conv: IDFConv) => string | string[];
    ask?: string | string[];
    close?: string | string[];
    media?: MediaObjectOptions;
    suggestion?: string | string[];
  };

  // no by default
  return?: boolean;
  error?: keyof InodeTable|Inode;
}

/*
export interface Icase {
  value: keyof IsymbolTable;
  node: Inode;
}
*/

// WILL BE REPLACED BY API MIDDLEWARE
/*
export interface Ihttp extends AxiosRequestConfig {
  // tslint:disable-next-line:no-any
  compute: (data: any, conv: IDFConv) => void;
  error: (e: string, conv: IDFConv) => void;
}
*/
