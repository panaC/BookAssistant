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

import { ES_MIN_SCORE
  , ES_MEAN_SCORE
  , ES_REF_INDEX
  , ES_REF_TYPE
  , ES_ENABLE
  , ES_INDEX
  , ES_TYPE
  , WEBPUB_MODEL_PROVIDER } from './../constants';
import { Model } from 'mongoose';
import { Injectable, Inject, Param } from '@nestjs/common';
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
    return toc ? toc.map((link) =>
      link.children ? [link.title, ...WebpubService.tocFlat(link.children)] : [link.title])
      .reduce((a, c) => {
        a.push(...c);
        return a;
      }, []) : [];
  }

  async delete(identifier: string): Promise<IWebpub> {
    const doc = await this.webpubModel.findOneAndDelete({
      'metadata.identifier': identifier,
    }).exec();
    if (doc && doc.id) {
      await this.elasticsearchService.delete({
        index: ES_INDEX,
        type: ES_TYPE,
        id: doc.id,
      }).toPromise();
    }
    await this.elasticsearchService.deleteByQuery({
        index: ES_REF_INDEX,
        body: {
          query: {
            match: {
              identifier,
            },
          },
        },
      });
    return doc;
  }

  async update(webpubDto: WebpubDto): Promise<IWebpub> {
    const doc = await this.webpubModel.findOneAndUpdate({
      'metadata.identifier': webpubDto.metadata.identifier,
    }, webpubDto).exec();
    if (doc && doc.id) {
      await this.elasticsearchService.update({
        index: ES_INDEX,
        type: ES_TYPE,
        id: doc.id,
        body: {
          title: webpubDto.metadata.title,
          author: webpubDto.metadata.author,
          ref: WebpubService.tocFlat(webpubDto.toc),
        },
      }).toPromise();
      await this.elasticsearchService.deleteByQuery({
        index: ES_REF_INDEX,
        body: {
          query: {
            match: {
              identifier: webpubDto.metadata.identifier,
            },
          },
        },
      });
      for (const ref of WebpubService.tocFlat(webpubDto.toc)) {
        await this.elasticsearchService.create({
          index: ES_REF_INDEX,
          type: ES_REF_TYPE,
          body: {
            identifier: webpubDto.metadata.identifier,
            ref,
          },
        });
      }
    }
    return doc;
  }

  async create(webpubDto: WebpubDto): Promise<IWebpub> {
    const created = new this.webpubModel(webpubDto);
    const doc = await created.save();
    if (doc && doc.id) {
      await this.elasticsearchService.create({
        index: ES_INDEX,
        type: ES_TYPE,
        id: doc.id,
        body: {
          title: webpubDto.metadata.title,
          author: webpubDto.metadata.author,
          ref: WebpubService.tocFlat(webpubDto.toc),
        },
      }).toPromise();
      for (const ref of WebpubService.tocFlat(webpubDto.toc)) {
        await this.elasticsearchService.create({
          index: ES_REF_INDEX,
          type: ES_REF_TYPE,
          body: {
            id: webpubDto.metadata.identifier,
            ref,
          },
        });
      }
    }
    return doc;
  }

  async findRef(identifier: string, ref: string): Promise<{}> {
    let es = await this.elasticsearchService.search({
      index: ES_REF_INDEX,
      type: ES_REF_TYPE,
      body: {
        query: {
          match: {
            identifier,
          },
        },
      },
    }).toPromise();
    if (es && es[0] && es[0].hits && es[0].hits.hits) {
      if (!ref || ref === '') {
        return JSON.stringify({ state: true});
      } else {
        es = await this.elasticsearchService.search({
          index: ES_REF_INDEX,
          type: ES_REF_TYPE,
          body: {
            query: {
              bool: {
                should: [
                  {
                    match: {
                      identifier,
                    },
                  },
                  {
                    match: {
                      ref: {
                        query: ref,
                        fuzziness: 'AUTO',
                      },
                    },
                  },
                ],
              },
            },
          },
        }).toPromise();
        if (es && es[0] && es[0].hits && es[0].hits.hits) {
          return JSON.stringify({ state: true, ref: es[0].hits.hits.map((f) => f._source.ref) });
        }
      }
    }
    return JSON.stringify({ state: false });
  }

  async find(title: string): Promise<WebpubDto[]> {
    let manifest = [];

    if (ES_ENABLE) {
      const es = await this.elasticsearchService.search({
        index: ES_INDEX,
        q: title,
        size: 5,
      }).toPromise();
      if (es && es[0] && es[0].hits && es[0].hits.hits) {
        for (const doc of es[0].hits.hits) {
          if (doc._score > ES_MEAN_SCORE) {
            manifest = [await this.webpubModel.findOne({ _id: doc._id })];
            break;
          } else if (doc._score > ES_MIN_SCORE || es[0].hits.total === 1) {
            manifest.push(await this.webpubModel.findOne({ _id: doc._id }));
          }
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
