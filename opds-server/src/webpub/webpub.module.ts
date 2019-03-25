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

import { Module } from '@nestjs/common';
import { FeedService } from './opds/feed.service';
import { DatabaseModule } from './../database/database.module';
import { WebpubController } from './webpub.controller';
import { WebpubService } from './webpub.service';
import { webpubProviders } from './webpub.providers';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [
    DatabaseModule,
    SearchModule,
  ],
  controllers: [WebpubController],
  providers: [
    FeedService,
    WebpubService,
    ...webpubProviders,
  ],
})
export class WebpubModule {}
