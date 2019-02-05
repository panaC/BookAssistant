import { webpubProviders } from './webpub.providers';
/*
 * File: webpub.module.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 9:51:08 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 10:07:54 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { WebpubController } from './webpub.controller';
import { WebpubService } from './webpub.service';

@Module({
  imports: [DatabaseModule],
  controllers: [WebpubController],
  providers: [
    WebpubService,
    ...webpubProviders,
  ],
})
export class WebpubModule {}
