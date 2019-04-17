/*
 * File: index.ts
 * Project: VoiceAssistant
 * File Created: Wednesday, 6th February 2019 11:11:17 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Wednesday, 6th February 2019 11:12:41 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import * as express from 'express';

import {appFactory} from '../app/app';
import {middlewareFactory} from '../app/middleware';
import {nodeTable} from '../app/table/nodeTable';

import {ENTRY_POINT, PORT, SERVER_NAME} from './constants';

export const server = express();

server.set('port', PORT);
server.set('trust proxy', 'loopback');
server.use(express.json({}));
server.post(ENTRY_POINT, appFactory(nodeTable(), middlewareFactory));
server.get('/', (req, res) => {
  res.send(SERVER_NAME);
});

// EOF
