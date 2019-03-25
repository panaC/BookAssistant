/*
 * File: search.providers.ts
 * Project: VoiceAssistant
 * File Created: Tuesday, 12th March 2019 6:47:25 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Tuesday, 12th March 2019 6:47:43 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { ES_PROVIDER } from 'src/constants';
import { ES_HOST } from './../constants';
import { Client } from 'elasticsearch';

export const searchProviders = [
    {
        provide: ES_PROVIDER,
        useFactory: async () => {
            return await new Client({
              host: ES_HOST,
              log: 'trace',
            });
        },
    },
];
