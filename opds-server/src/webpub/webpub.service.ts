import { LINK_SELF } from './../constants';
/*
 * File: webpub.service.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 9:50:05 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 10:08:40 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { WEBPUB_MODEL_PROVIDER, NAME_SERVER } from '../constants';
import { IWebpub } from './interfaces/webpub.inteface';
import { WebpubDto } from './dto/webpub.dto';
import { plainToClass } from 'class-transformer';
import { JSON } from 'ta-json-x';
import { OpdsDto } from './opds/dto/opds.dto';

@Injectable()
export class WebpubService {
  constructor(
    @Inject(WEBPUB_MODEL_PROVIDER) private readonly webpubModel: Model<IWebpub>) {}

  async delete(Title: string): Promise<void> {
    await this.webpubModel.deleteOne({ 'metadata.title': Title }).exec();
  }

  async create(webpubDto: WebpubDto): Promise<IWebpub> {
    const created = new this.webpubModel(webpubDto);
    return await created.save();
  }

  async find(Title: string): Promise<WebpubDto> {
    const manifest = await this.webpubModel.findOne({$text: {$search: Title}}).lean().exec();
    if (manifest) {
      const object = plainToClass(WebpubDto, JSON.parse(JSON.stringify(manifest)));
      return JSON.serialize(object);
    }
    return {} as WebpubDto;
  }

  async findAll(): Promise<OpdsDto> {
    const manifest = await this.webpubModel.find({}).lean().exec();
    const opds = new OpdsDto(NAME_SERVER, LINK_SELF);
    if (manifest && manifest.length) {
      opds.publication = new Array();
      manifest.forEach(el => opds.publication.push(JSON.parse(JSON.stringify(el))));
    }
    return JSON.serialize(opds);
  }

  async update(webpubDto: WebpubDto): Promise<void> {
    await this.webpubModel.updateOne({ 'metadata.title': webpubDto.metadata.title }, webpubDto).exec();
  }
}
