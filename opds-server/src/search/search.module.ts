/*
 * File: search.module.ts
 * Project: VoiceAssistant
 * File Created: Monday, 11th March 2019 6:38:30 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 11th March 2019 6:40:23 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { Module } from '@nestjs/common';
import { searchProviders } from './search.providers';

@Module({
    providers: [...searchProviders],
    exports: [...searchProviders],
})
export class SearchModule { }
