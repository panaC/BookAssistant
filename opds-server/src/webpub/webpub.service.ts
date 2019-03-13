import { MORE_RECENT_GROUP_NAME } from './../constants';
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
  , WEBPUB_MODEL_PROVIDER
  , ES_PROVIDER } from './../constants';
import { Model } from 'mongoose';
import { Injectable, Inject, Param } from '@nestjs/common';
import { IWebpub } from './interfaces/webpub.inteface';
import { WebpubDto } from './dto/webpub.dto';
import { plainToClass } from 'class-transformer';
import { JSON } from 'ta-json-x';
import { LinksDto } from './dto/links.dto';
import { Client, SearchResponse } from 'elasticsearch';

interface IESref {
  identifier: string;
  ref: string;
}

@Injectable()
export class WebpubService {
  constructor(
    @Inject(WEBPUB_MODEL_PROVIDER) private readonly webpubModel: Model<IWebpub>,
    @Inject(ES_PROVIDER) private readonly elasticsearchService: Client) {}

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
      });
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
      });
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
      });
      for (const ref of WebpubService.tocFlat(webpubDto.toc)) {
        await this.elasticsearchService.index({
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

  async findRef(identifier: string, ref: string): Promise<{}> {
    let es = await this.elasticsearchService.search({
      index: ES_REF_INDEX,
      type: ES_REF_TYPE,
      body: {
        query: {
          term: {
            'identifier.keyword': identifier,
          },
        },
      },
    });
    if (es && es.hits && es.hits.hits && es.hits.hits.length) {
      if (!ref || ref === '') {
        return { state: true, ref: []};
      } else {
        es = await this.elasticsearchService.search({
          index: ES_REF_INDEX,
          type: ES_REF_TYPE,
          body: {
            query: {
              bool: {
                should: [
                  {
                    term: {
                      'identifier.keyword': identifier,
                    },
                  },
                  {
                    match: {
                      ref,
                    },
                  },
                ],
              },
            },
          },
        });
        if (es && es.hits && es.hits.hits) {
          return {
            state: true,
            ref: ((e) => {
              const ret = [];
              e.forEach((r) => {
                if (r._score > ES_MIN_SCORE) {
                  ret.push(r._source.ref);
                }
              });
              return ret;
            })((es as SearchResponse<IESref>).hits.hits),
          };
        }
      }
    }
    return { state: false };
  }

  async find(title: string): Promise<WebpubDto[]> {
    let manifest = [];

    if (ES_ENABLE) {
      const es = await this.elasticsearchService.search({
        index: ES_INDEX,
        q: title,
        size: 5,
      });
      if (es && es.hits && es.hits.hits) {
        for (const doc of es.hits.hits) {
          if (doc._score > ES_MEAN_SCORE) {
            manifest = [await this.webpubModel.findOneAndUpdate({
              _id: doc._id,
            }, {
              $inc: { numberOfListen: 1 },
            })];
            break;
          } else if (doc._score > ES_MIN_SCORE || es.hits.total === 1) {
            manifest.push(await this.webpubModel.findOneAndUpdate({
              _id: doc._id,
            }, {
              $inc: { numberOfListen: 1 },
            }));
          }
        }
      }
    } else {
      manifest = [await this.webpubModel.findOneAndUpdate({
        $text: { $search: title },
      }, {
        $inc: { numberOfListen: 1 },
      }).lean().exec()];
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

  async findGroup(group: string, numberOfItem: number = 5, sort: number = -1, page: number = 0): Promise<WebpubDto[]> {
    let manifest: IWebpub[];
    if (group === MORE_RECENT_GROUP_NAME) {
      manifest = await this.webpubModel.find({})
        .sort({ 'metadata.dateModified': sort })
        .limit(numberOfItem)
        .skip(page * numberOfItem)
        .lean()
        .exec();
    } else {
      manifest = await this.webpubModel.find({})
        .sort({ numberOfListen: sort })
        .limit(numberOfItem)
        .skip(page * numberOfItem)
        .lean()
        .exec();
    }
    if (manifest) {
      const object = plainToClass(WebpubDto, JSON.parse(JSON.stringify(manifest)));
      return JSON.serialize(object);
    }
    return [] as WebpubDto[];
  }
}
