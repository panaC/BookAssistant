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

import express from 'express';
import bodyParser from 'body-parser';
import { SERVER_NAME, ENTRY_POINT, PORT } from './constants';
import { app } from './app/app';

export const server = express();

server.set('port', PORT);
server.set('trust proxy', 'loopback');
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
server.use(bodyParser.json());
server.post(ENTRY_POINT, app);
server.get('/', (req, res) => {
  res.send(SERVER_NAME);
});
