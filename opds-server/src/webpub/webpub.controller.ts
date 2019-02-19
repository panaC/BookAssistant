import { PAGE_URI } from './../constants';
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
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { WebpubDto } from './dto/webpub.dto';
import { OpdsDto } from './opds/dto/opds.dto';
import { SEARCH_URI, LANG_URI, COLLECTION_URI, GENRE_URI, GROUP_URI, NUMBER_OF_ITEM_URI, SORT_URI } from './../constants';
import { FeedService } from './opds/feed.service';

@Controller('webpub')
@ApiUseTags('webpub')
export class WebpubController {
  constructor(
    private readonly webpubService: WebpubService,
    private readonly feedService: FeedService) {}

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
  async read(@Query(SEARCH_URI) search: string,
             @Query(LANG_URI) lang: string,
             @Query(COLLECTION_URI) collection: string,
             @Query(GENRE_URI) genre: string,
             @Query(GROUP_URI) group: string,
             @Query(NUMBER_OF_ITEM_URI) numberOfItem: string,
             @Query(SORT_URI) sort: string,
             @Query(PAGE_URI) page: string): Promise<OpdsDto | WebpubDto | WebpubDto[]> {
    try {
      let lNumberOfItem = 5;
      let lSort = -1;
      let lPage = 0;
      if (numberOfItem) {
        lNumberOfItem = parseInt(numberOfItem, 10);
      }
      if (sort && (sort === '-1' || sort === '1')) {
        lSort = parseInt(sort, 10);
      }
      if (page) {
        lPage = parseInt(page, 10);
      }
      if (search) {
        return await this.webpubService.find(search);
      } else if (lang) {
        return await this.webpubService.findLang(lang, lNumberOfItem, lSort, lPage,
          /*parseInt(numberOfItem, 10), parseInt(sort, 10), parseInt(page, 10)*/);
      } else if (collection) {
        return await this.webpubService.findCollection(collection, lNumberOfItem, lSort, lPage,
          /*parseInt(numberOfItem, 10), parseInt(sort, 10), parseInt(page, 10)*/);
      } else if (genre) {
        return await this.webpubService.findGenre(genre, lNumberOfItem, lSort, lPage,
          /*parseInt(numberOfItem, 10), parseInt(sort, 10), parseInt(page, 10)*/);
      } else if (group) {
        return await this.webpubService.findGroup(group, lNumberOfItem, lSort, lPage,
          /*parseInt(numberOfItem, 10), parseInt(sort, 10), parseInt(page, 10)*/);
      }
      return await this.feedService.feed();
    } catch (err) {
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }
  }
}
