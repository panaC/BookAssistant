/*
 * File: database.providers.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 9:46:15 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 10:05:09 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import * as mongoose from 'mongoose';
import { DB_PROVIDER, DB_URI } from '../constants';

export const databaseProviders = [
    {
        provide: DB_PROVIDER,
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect(DB_URI);
        },
    },
];
