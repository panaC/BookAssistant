/*
 * File: main.ts
 * Project: VoiceAssistant
 * File Created: Wednesday, 6th February 2019 11:32:14 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Wednesday, 6th February 2019 11:32:15 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { SERVER_NAME, ENTRY_POINT } from './core/constants';
import { server } from './core/server';

if (typeof require !== 'undefined' && require.main === module) {
  server.listen(server.get('port'), () => {
    // tslint:disable-next-line:no-console
    console.log(`${SERVER_NAME} is running at http://localhost:${server.get('port')}${ENTRY_POINT}`);
  });
}
