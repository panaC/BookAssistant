/*
 * File: mae.interface.ts
 * Project: VoiceAssistant
 * File Created: Friday, 29th March 2019 11:54:37 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Friday, 29th March 2019 11:54:41 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { Estate } from './../state';
import { DFConv } from './../../app';

 export interface Imae {
   (conv: DFConv): void;
   setState(): void;
   getState(): Estate;
   loop: number;
   conv: DFConv;
 }