/*
 * File: state.ts
 * Project: VoiceAssistant
 * File Created: Saturday, 30th March 2019 2:53:52 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Saturday, 30th March 2019 2:53:55 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import {Inode} from './../../core/middleware/graph';

export const start: Inode = {
  intent: true,
  name: 'start_intent',
  return: true,
  context: {
    name: 'start',
  },
  conv: {
    ask: 'welcome.home',
  },
};
