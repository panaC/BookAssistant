/*
 * File: debug.ts
 * Project: VoiceAssistant
 * File Created: Tuesday, 2nd April 2019 12:17:57 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Tuesday, 2nd April 2019 12:18:00 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { Debugger } from './debugger';

const isEnabled = process.env.NODE_ENV !== 'production';

export const debug = {
  core: new Debugger(console, isEnabled, '[CORE]'),
  service: new Debugger(console, isEnabled, '[SERVICE]'),
  app: new Debugger(console, isEnabled, '[APP]'),
};
