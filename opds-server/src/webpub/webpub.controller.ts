/*
 * File: webpub.controller.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 9:48:22 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 10:07:42 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { Controller
  , Body
  , HttpException
  , HttpStatus
  , Query
  , Post
  , Get
  , HttpCode
  , Delete
  , Put } from '@nestjs/common';
import { WebpubService } from './webpub.service';
import { IWebpub } from './interfaces/webpub.inteface';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { WebpubDto } from './dto/webpub.dto';
import { OpdsDto } from './dto/opds.dto';

@Controller('webpub')
@ApiUseTags('webpub')
export class WebpubController {
  constructor(
    private readonly webpubService: WebpubService) {}

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
      status: 200,
      description: 'create webpub Manifest',
  })
  @Post()
  async create(@Body() webpubDto: WebpubDto) {
    try {
      await this.webpubService.create(webpubDto);
      return 'webpub saved';
    } catch (err) {
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
      status: 200,
      description: 'delete webpub Manifest with title identification',
  })
  @Delete()
  async delete(@Query('q') title: string) {
    try {
      await this.webpubService.delete(title);
      return 'webpub deleted';
    } catch (err) {
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
      status: 200,
      description: 'update webpub Manifest with title identification',
  })
  @Put()
  async update(@Body() webpubDto: WebpubDto) {
    try {
      await this.webpubService.update(webpubDto);
      return 'webpub updated';
    } catch (err) {
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
      status: 200,
      description: 'return webpub Manifest with title identification',
  })
  @Get()
  async read(@Query('q') title: string): Promise<OpdsDto | WebpubDto> {
    try {
      if (!title) {
        return await this.webpubService.findAll();
      }
      return await this.webpubService.find(title);
    } catch (err) {
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }
}
