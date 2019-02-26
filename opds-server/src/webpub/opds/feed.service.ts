/*
 * File: feed.ts
 * Project: VoiceAssistant
 * File Created: Monday, 18th February 2019 12:00:07 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 18th February 2019 12:00:11 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { MetadataDto } from '../dto/metadata.dto';
import { SORT_URI
  , MORE_POPULAR_GROUP_NAME
  , GROUP_URI, WEBPUB_MODEL_PROVIDER
  , MORE_RECENT_GROUP_NAME
  , COLLECTION_URI
  , GENRE_URI, LANG_URI
  , PAGE_URI
  , NAME_SERVER
  , LINK_SELF_SERVER
  , SEARCH_URI
  , NUMBER_OF_ITEM_URI
  , LINK_HREF
  , LINK_TYPE } from './../../constants';
import { OpdsDto } from './dto/opds.dto';
import { MetadataOpdsDto } from './dto/metadataOpds.dto';
import { plainToClass } from 'class-transformer';
import { LinksDto } from '../dto/links.dto';
import { JSON } from 'ta-json-x';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IWebpub } from '../interfaces/webpub.inteface';

@Injectable()
export class FeedService extends OpdsDto {

  constructor(
    @Inject(WEBPUB_MODEL_PROVIDER) private readonly webpubModel: Model<IWebpub>) {
    super();
    this.init();
  }

  public async init() {
    const self = this;
    {
      self.metadata = new MetadataOpdsDto();
      self.metadata.title = NAME_SERVER;
      self.links = new Array();
      self.links.push(plainToClass<LinksDto, LinksDto>(LinksDto, JSON.parse<LinksDto>(LINK_SELF_SERVER(''), LinksDto)));
      self.links.push(plainToClass<LinksDto, LinksDto>(LinksDto,
        JSON.parse<LinksDto>(LINK_SELF_SERVER(`?${SEARCH_URI}=\${${SEARCH_URI}}`, `search`), LinksDto)));
      self.links.push(plainToClass<LinksDto, LinksDto>(LinksDto,
        JSON.parse<LinksDto>(LINK_SELF_SERVER(`?${GROUP_URI}=\${${GROUP_URI}}`, `${GROUP_URI}`), LinksDto)));
      self.links.push(plainToClass<LinksDto, LinksDto>(LinksDto,
        JSON.parse<LinksDto>(LINK_SELF_SERVER(`?${LANG_URI}=\${${LANG_URI}}`, `${LANG_URI}`), LinksDto)));
      self.links.push(plainToClass<LinksDto, LinksDto>(LinksDto,
        JSON.parse<LinksDto>(LINK_SELF_SERVER(`?${COLLECTION_URI}=\${${COLLECTION_URI}}`, `${COLLECTION_URI}`), LinksDto)));
      self.links.push(plainToClass<LinksDto, LinksDto>(LinksDto,
        JSON.parse<LinksDto>(LINK_SELF_SERVER(`?${GENRE_URI}=\${${GENRE_URI}}`, `${GENRE_URI}`), LinksDto)));
      self.links.push(plainToClass<LinksDto, LinksDto>(LinksDto,
        JSON.parse<LinksDto>(LINK_SELF_SERVER(`?${NUMBER_OF_ITEM_URI}=\${${NUMBER_OF_ITEM_URI}}`, `${NUMBER_OF_ITEM_URI}`), LinksDto)));
      self.links.push(plainToClass<LinksDto, LinksDto>(LinksDto,
        JSON.parse<LinksDto>(LINK_SELF_SERVER(`?${SORT_URI}=\${${SORT_URI}}`, `${SORT_URI}`), LinksDto)));
      self.links.push(plainToClass<LinksDto, LinksDto>(LinksDto,
        JSON.parse<LinksDto>(LINK_SELF_SERVER(`?${PAGE_URI}=\${${PAGE_URI}}`, `${PAGE_URI}`), LinksDto)));
    }

    // facets
    self.facets = new Array();
    {
      //  - lang
      // find the mongoose filter to extract lang only available
      const lang = new OpdsDto();
      lang.metadata = new MetadataDto();
      lang.metadata.title = LANG_URI;
      this.webpubModel.find({}).distinct('metadata.language', (err, res) => {
        if (!err) {
          lang.links = new Array();
          res.forEach((val) => {
            const links = new LinksDto();
            links.href = LINK_HREF(`?${LANG_URI}=${encodeURI(val)}`);
            links.type = LINK_TYPE;
            links.title = val;
            lang.links.push(links);
          });
        }
      });
      self.facets.push(lang);
    }

    {
      //  - collection
      // find the mongoose filter to extract collection name
      const coll = new OpdsDto();
      coll.metadata = new MetadataDto();
      coll.metadata.title = COLLECTION_URI;
      this.webpubModel.find({}).distinct('metadata.corpus', (err, res) => {
        if (!err) {
          coll.links = new Array();
          res.forEach((val) => {
            const links = new LinksDto();
            links.href = LINK_HREF(`?${COLLECTION_URI}=${encodeURI(val)}`);
            links.type = LINK_TYPE;
            links.title = val;
            coll.links.push(links);
          });
        }
      });
      self.facets.push(coll);
    }

    {
      //  - genre
      // find the mongoose filter to extract collection name
      const genre = new OpdsDto();
      genre.metadata = new MetadataDto();
      genre.metadata.title = GENRE_URI;
      this.webpubModel.find({}).distinct('metadata.genre', (err, res) => {
        if (!err) {
          genre.links = new Array();
          res.forEach((val) => {
            const links = new LinksDto();
            links.href = LINK_HREF(`?${GENRE_URI}=${encodeURI(val)}`);
            links.type = LINK_TYPE;
            links.title = val;
            genre.links.push(links);
          });
        }
      });
      self.facets.push(genre);
    }
    {
      //  - groups
      const groups = new OpdsDto();
      groups.metadata = new MetadataDto();
      groups.metadata.title = GROUP_URI;
      groups.links = new Array();
      {
        const links = new LinksDto();
        links.href = LINK_HREF(`?${GROUP_URI}=${encodeURI(MORE_POPULAR_GROUP_NAME)}`);
        links.type = LINK_TYPE;
        links.title = MORE_POPULAR_GROUP_NAME;
        groups.links.push(links);
      }
      {
        const links = new LinksDto();
        links.href = LINK_HREF(`?${GROUP_URI}=${encodeURI(MORE_RECENT_GROUP_NAME)}`);
        links.type = LINK_TYPE;
        links.title = MORE_RECENT_GROUP_NAME;
        groups.links.push(links);
      }
      self.facets.push(groups);
    }

    // groups
    self.groups = new Array();
    {
      //  - more listen
      const popular = new OpdsDto();
      popular.metadata = new MetadataDto();
      popular.metadata.title = MORE_POPULAR_GROUP_NAME;
      popular.links = new Array();
      popular.links.push(plainToClass<LinksDto, LinksDto>(LinksDto,
        JSON.parse<LinksDto>(LINK_SELF_SERVER(`?${GROUP_URI}=${encodeURI(MORE_POPULAR_GROUP_NAME)}`, 'self'), LinksDto)));
      // here set the algorithm line for extract more listen webpub from mongodb
      const manifest: IWebpub[] = await self.webpubModel.find({}).limit(5).lean().exec();
      if (manifest && manifest.length) {
        popular.publication = new Array();
        manifest.forEach(el => popular.publication.push(JSON.parse(JSON.stringify(el))));
      }
      self.groups.push(popular);
    }

    {
      //  - more recent
      const recent = new OpdsDto();
      recent.metadata = new MetadataDto();
      recent.metadata.title = MORE_RECENT_GROUP_NAME;
      recent.links = new Array();
      recent.links.push(plainToClass<LinksDto, LinksDto>(LinksDto,
        JSON.parse<LinksDto>(LINK_SELF_SERVER(`?${GROUP_URI}=${encodeURI(MORE_RECENT_GROUP_NAME)}`, 'self'), LinksDto)));
      // here set the algorithm line for extract more recent webpub from mongodb
      const manifest: IWebpub[] = await self.webpubModel.find({}).limit(5).lean().exec();
      if (manifest && manifest.length) {
        recent.publication = new Array();
        manifest.forEach(el => recent.publication.push(JSON.parse(JSON.stringify(el))));
      }
      self.groups.push(recent);
    }

    // publication
    //  empty doesn't use
    //    only in publication group
  }

  async feed(): Promise<OpdsDto> {
    await this.init();
    return JSON.serialize(this);
  }
}
