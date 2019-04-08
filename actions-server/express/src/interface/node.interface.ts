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

import { DFConv, IsymbolTable, IintentTable } from '../app/app';
import { MediaObjectOptions, Contexts } from 'actions-on-google';
import { AxiosRequestConfig } from 'axios';

export interface Inode {
  // Symbol name
  name?: keyof IsymbolTable;
  context?: string | string[]/*Contexts | Contexts[]*/;

  http?: Ihttp | Ihttp[];

  // add function directly but i can't use json in config file but only ts files
  test?: (conv: DFConv) => string;
  // only default switch state is required

  // use reduce here with init = default and [] = case
  switch?: {
    // possibly add more state for more context switch
    case?: Array<keyof IsymbolTable>;
    default: keyof IsymbolTable;
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
  error?: keyof IsymbolTable | Inode;
}

/*
export interface Icase {
  value: keyof IsymbolTable;
  node: Inode;
}
*/

export interface Ihttp extends AxiosRequestConfig {
  // tslint:disable-next-line:no-any
  compute: (data: any, conv: DFConv) => void;
  error: (e: string, conv: DFConv) => void;
}


