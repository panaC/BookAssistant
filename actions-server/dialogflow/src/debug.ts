import { APP_NAME } from './constants';
/*
 * File: debug.ts
 * Project: VoiceAssistant
 * File Created: Thursday, 7th February 2019 3:47:32 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Thursday, 7th February 2019 3:47:41 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import debug from 'debug';

export const log = debug(`${APP_NAME}:log`);
export const err = debug(`${APP_NAME}:err`);
