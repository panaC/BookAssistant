/*
 * File: app.module.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 9:51:58 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 10:09:12 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebpubModule } from './webpub/webpub.module';

@Module({
  imports: [WebpubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
