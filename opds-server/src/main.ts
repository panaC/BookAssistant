/*
 * File: main.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 9:19:46 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 10:09:47 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipe/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PORT_SERVER } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Configuration
  const options = new DocumentBuilder()
    .setTitle('OPDS2 Server')
    .setDescription('OPDS2 Webpub Manifest Server')
    .setVersion('1.0')
    .addTag('OPDS2')
    .addBearerAuth('Authorization', 'header')
    .build();
    // .setBasePath(basePath)
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(PORT_SERVER);
}
bootstrap();
