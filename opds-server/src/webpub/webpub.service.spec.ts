/*
 * File: webpub.service.spec.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 9:50:05 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 10:08:29 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { Test, TestingModule } from '@nestjs/testing';
import { WebpubService } from './webpub.service';

describe('WebpubService', () => {
  let service: WebpubService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebpubService],
    }).compile();
    service = module.get<WebpubService>(WebpubService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
