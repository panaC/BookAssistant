/*
 * File: database.module.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 9:46:39 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 10:04:47 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule { }
