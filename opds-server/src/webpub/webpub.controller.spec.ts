/*
 * File: webpub.controller.spec.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 9:48:22 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 10:07:29 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { Test, TestingModule } from '@nestjs/testing';
import { WebpubController } from './webpub.controller';

describe('Webpub Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [WebpubController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: WebpubController = module.get<WebpubController>(WebpubController);
    expect(controller).toBeDefined();
  });
});
