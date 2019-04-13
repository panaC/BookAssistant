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

import { MediaObjectOptions } from 'actions-on-google';
import { IcontextTable, InodeTable } from './../../../../app/interface';
import { IDFConv } from './../../../';
import { Iapi } from '../../../../app/interface/api.interface';

type Tapi = (f: Iapi) => void;

export interface Inode {
  // Symbol name
  name?: keyof InodeTable;
  context?: keyof IcontextTable | Array<keyof IcontextTable>;

  api?: Tapi[] | Tapi;

  // add function directly but i can't use json in config file but only ts files
  test?: (conv: IDFConv) => string;
  // only default switch state is required

  // use reduce here with init = default and [] = case
  switch?: {
    // possibly add more state for more context switch
    case?: Array<keyof InodeTable>;
    default: keyof InodeTable;
  };
  conv?: {
    arg?: string | string[];
    ask?: string | string[];
    close?: string | string[];
    media?: MediaObjectOptions;
    suggestion?: string | string[];
  };

  // no by default
  return?: boolean;
  error?: keyof InodeTable | Inode;
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
