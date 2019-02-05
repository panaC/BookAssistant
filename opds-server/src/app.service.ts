/*
 * File: app.service.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 9:19:46 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 10:09:23 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { Injectable } from '@nestjs/common';
import { NAME_SERVER } from './constants';

@Injectable()
export class AppService {
  getHello(): string {
    return NAME_SERVER;
  }
}
