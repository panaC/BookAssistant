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
import { WEBPUB_MODEL_PROVIDER, ES_TYPE, ES_INDEX, ES_ENABLE } from '../constants';
import { IWebpub } from './interfaces/webpub.inteface';
import { WebpubDto } from './dto/webpub.dto';
import { plainToClass } from 'class-transformer';
import { JSON } from 'ta-json-x';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { LinksDto } from './dto/links.dto';

@Injectable()
export class WebpubService {
  constructor(
    @Inject(WEBPUB_MODEL_PROVIDER) private readonly webpubModel: Model<IWebpub>,
    private readonly elasticsearchService: ElasticsearchService) {}

  private static tocFlat(toc: LinksDto[]): string[] {
    return toc.map((link) =>
      link.children ? [link.title, ...WebpubService.tocFlat(link.children)] : [link.title])
      .reduce((a, c) => {
        a.push(...c);
        return a;
      }, []);

  }

  async delete(identifier: string): Promise<void> {
    const doc = await this.webpubModel.findOneAndDelete({
      'metadata.identifier': identifier,
    }).exec();
    try {
      this.elasticsearchService.delete({
        index: ES_INDEX,
        type: ES_TYPE,
        id: doc._id,
      });
    } catch (e) {
      throw new Error('there are no books to delete');
    }
  }

  async update(webpubDto: WebpubDto): Promise<void> {
    const doc = await this.webpubModel.findOneAndUpdate({
      'metadata.identifier': webpubDto.metadata.identifier,
    }, webpubDto).exec();
    try {
      await this.elasticsearchService.update({
        index: ES_INDEX,
        type: ES_TYPE,
        id: doc._id,
        body: {
          title: webpubDto.metadata.title,
          author: webpubDto.metadata.author,
          toc_title: WebpubService.tocFlat(webpubDto.toc),
        },
      });
    } catch (e) {
      throw new Error('there are no books to update');
    }
  }

  async create(webpubDto: WebpubDto): Promise<IWebpub> {
    const created = new this.webpubModel(webpubDto);
    const doc = await created.save();
    try {
      await this.elasticsearchService.create({
        index: ES_INDEX,
        type: ES_TYPE,
        id: doc._id,
        body: {
          title: webpubDto.metadata.title,
          author: webpubDto.metadata.author,
          toc_title: WebpubService.tocFlat(webpubDto.toc),
        },
      });
    } catch (e) {
      throw new Error('An error is happened to index this webpub');
    }
    return doc;
  }

  async find(title: string): Promise<WebpubDto[]> {
    let manifest = [];

    if (ES_ENABLE) {
      const es = await this.elasticsearchService.search({
        index: ES_INDEX,
        q: title,
        size: 5,
      }).toPromise();
      if (es && es.hits && es.hits.hits) {
        for (const doc of es.hits.hits) {
          manifest.push(await this.webpubModel.find({ _id: doc._id }));
        }
      }
    } else {
      manifest = await this.webpubModel.find({ $text: { $search: title } }).lean().exec();
    }
    if (manifest) {
      const object = plainToClass(WebpubDto, JSON.parse(JSON.stringify(manifest)));
      return JSON.serialize(object);
    }
    return [] as WebpubDto[];
  }

  async findLang(lang: string, numberOfItem: number = 5, sort: number = 1, page: number = 0): Promise<WebpubDto[]> {
    const manifest: IWebpub[] = await this.webpubModel.find({ 'metadata.language': lang })
      .sort({ 'metadata.dateModified': sort })
      .limit(numberOfItem)
      .skip(page * numberOfItem)
      .lean()
      .exec();
    if (manifest) {
      const object = plainToClass(WebpubDto, JSON.parse(JSON.stringify(manifest)));
      return JSON.serialize(object);
    }
    return [] as WebpubDto[];
  }

  async findCollection(collection: string, numberOfItem: number = 5, sort: number = 1, page: number = 0): Promise<WebpubDto[]> {
    const manifest: IWebpub[] = await this.webpubModel.find({ 'metadata.corpus': collection })
      .sort({ 'metadata.dateModified': sort })
      .limit(numberOfItem)
      .skip(page * numberOfItem)
      .lean()
      .exec();
    if (manifest) {
      const object = plainToClass(WebpubDto, JSON.parse(JSON.stringify(manifest)));
      return JSON.serialize(object);
    }
    return [] as WebpubDto[];
  }

  async findGenre(genre: string, numberOfItem: number = 5, sort: number = 1, page: number = 0): Promise<WebpubDto[]> {
    const manifest: IWebpub[] = await this.webpubModel.find({ 'metadata.genre': genre })
      .sort({ 'metadata.dateModified': sort })
      .limit(numberOfItem)
      .skip(page * numberOfItem)
      .lean()
      .exec();
    if (manifest) {
      const object = plainToClass(WebpubDto, JSON.parse(JSON.stringify(manifest)));
      return JSON.serialize(object);
    }
    return [] as WebpubDto[];
  }

  async findGroup(group: string, numberOfItem: number = 5, sort: number = 1, page: number = 0): Promise<WebpubDto[]> {
    const manifest: IWebpub[] = await this.webpubModel.find({})
      .sort({ 'metadata.dateModified': sort })
      .limit(numberOfItem)
      .skip(page * numberOfItem)
      .lean()
      .exec();
    if (manifest) {
      const object = plainToClass(WebpubDto, JSON.parse(JSON.stringify(manifest)));
      return JSON.serialize(object);
    }
    return [] as WebpubDto[];
  }
}
