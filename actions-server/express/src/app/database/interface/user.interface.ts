/*
 * File: user.interface.ts
 * Project: VoiceAssistant
 * File Created: Wednesday, 3rd April 2019 9:41:18 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Wednesday, 3rd April 2019 9:41:25 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import Nano from 'nano';

export interface IuserSession {
  id: string;
  lastSeen: Date;
}

export interface Iuser extends Nano.MaybeDocument {
  lastSeen: Date;
  sessionCount: number;
  locale: string;
  session: IuserSession[];
  data: {};
}
