import { Collection } from 'mongoose';
/*
 * File: metdata.dto.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 11:04:59 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 11:05:02 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { JsonProperty, JsonType, JsonObject, BeforeDeserialized } from 'ta-json-x';
import { IsNotEmpty
  , IsUrl
  , IsOptional
  , IsDate
  , IsISBN
  , IsNumber
  , Min
  , Max
  , IsString
  , IsDateString
  , IsISO8601 } from 'class-validator';

@JsonObject()
export class MetadataDto {

  @ApiModelProperty({
    description: '@type key to describe the nature of the publication',
    required: true,
    format: 'URL',
  })
  @JsonProperty('@type')
  @JsonType(String)
  @IsNotEmpty()
  @IsUrl()
  readonly type: string;

  @ApiModelProperty({
    description: 'title of publication',
    required: true,
    format: 'Unique String',
  })
  @JsonProperty('title')
  @JsonType(String)
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiModelProperty({
    description: 'unique identifier of publication',
    required: false,
  })
  @JsonProperty('identifier')
  @JsonType(String)
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @ApiModelProperty({
    description: 'The date on which the document was created',
    required: true,
    format: 'Date',
  })
  @JsonProperty('dateCreated')
  @JsonType(Date)
  @IsNotEmpty()
  @IsDate()
  readonly dateCreated: Date;

  @ApiModelProperty({
    description: 'The date on which the document was modified',
    required: false,
  })
  @JsonProperty('dateModified')
  @JsonType(Date)
  @IsOptional()
  @IsDate()
  dateModified: Date;

  @BeforeDeserialized()
  public setDateModified() {
    this.dateModified = new Date(Date.now());
  }

  @ApiModelProperty({
    description: 'The language of the item',
    required: false,
    format: 'ISO 3166 coutry alpha-2-code format',
  })
  @JsonProperty('language')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly language: string;

  @ApiModelProperty({
    description: 'The duration of the item',
    required: false,
    format: 'ISO 8601 time format',
  })
  @JsonProperty('duration')
  @JsonType(String)
  @IsOptional()
  @IsISO8601()
  readonly duration: string;

  @ApiModelProperty({
    description: 'A person who reads (performs) the audiobook',
    required: false,
  })
  @JsonProperty('readBy')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly readBy: string;

  @ApiModelProperty({
    description: 'The bitrate of the media object',
    required: false,
  })
  @JsonProperty('bitrate')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly bitrate: string;

  @ApiModelProperty({
    description: 'File size in mega bytes',
    required: false,
  })
  @JsonProperty('contentSize')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly contentSize: string;

  @ApiModelProperty({
    description: 'Media type typically expressed using a MIME format',
    required: false,
  })
  @JsonProperty('encodingFormat')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly encodingFormat: string;

  @ApiModelProperty({
    description: 'The date on which the document was published',
    required: true,
    format: 'Date in ISO String format',
  })
  @JsonProperty('published')
  @JsonType(String)
  @IsOptional()
  @IsDateString()
  readonly published: string;

  @ApiModelProperty({
    description: 'The ISBN of the book',
    required: false,
  })
  @JsonProperty('isbn')
  @JsonType(String)
  @IsOptional()
  @IsISBN()
  readonly isbn: string;

  @ApiModelProperty({
    description: 'he number of pages in the book',
    required: false,
  })
  @JsonProperty('numberOfPages')
  @JsonType(Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100000)
  readonly numberOfPages: number;

  @ApiModelProperty({
    description: 'The illustrator of the book',
    required: false,
  })
  @JsonProperty('illustrator')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly illustrator: string;

  @ApiModelProperty({
    description: 'The format of the book',
    required: false,
  })
  @JsonProperty('bookFormat')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly bookFormat: string;

  @ApiModelProperty({
    description: 'The edition of the book',
    required: false,
  })
  @JsonProperty('bookEdition')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly bookEdition: string;

  @ApiModelProperty({
    description: 'The author of this content',
    required: false,
  })
  @JsonProperty('author')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly author: string;

  @ApiModelProperty({
    description: 'The publisher of this document',
    required: false,
  })
  @JsonProperty('publisher')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly publisher: string;

  @ApiModelProperty({
    description: 'The description of this document',
    required: false,
  })
  @JsonProperty('description')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiModelProperty({
    description: 'An award won by or for this item',
    required: false,
  })
  @JsonProperty('award')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly award: string;

  @ApiModelProperty({
    description: 'Comments, typically from users.',
    required: false,
  })
  @JsonProperty('comment')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly comment: string;

  @ApiModelProperty({
    description: 'Genre of the document, used in facets',
    required: false,
  })
  @JsonProperty('genre')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly genre: string;

  @ApiModelProperty({
    description: 'Specifies the company who edited the document',
    required: false,
  })
  @JsonProperty('editor')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly editor: string;

  @ApiModelProperty({
    description: 'The version of the document',
    required: false,
  })
  @JsonProperty('version')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly version: string;

  @ApiModelProperty({
    description: 'The source URL of the document',
    required: false,
  })
  @JsonProperty('url')
  @JsonType(String)
  @IsOptional()
  @IsUrl()
  readonly url: string;

  @ApiModelProperty({
    description: 'Collection name of a book corpus',
    required: false,
  })
  @JsonProperty('collection')
  @JsonType(String)
  @IsOptional()
  @IsString()
  readonly corpus: string;
}
