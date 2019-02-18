/*
 * File: webpub.dto.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 10:20:29 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 10:54:03 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { JsonProperty, JsonType, JsonObject, JsonElementType, BeforeDeserialized, JSON } from 'ta-json-x';
import { IsNotEmpty, IsUrl, ValidateNested, IsOptional } from 'class-validator';
import { MetadataDto } from './metadata.dto';
import { LinksDto } from './links.dto';
import { plainToClass } from 'class-transformer';

// todo add jsonConverter to string
// https://github.com/readium/r2-opds-js/blob/develop/src/opds/opds2/opds2.ts#L32
@JsonObject()
export class WebpubDto {

  @ApiModelProperty({
    description: 'Default context definition used in every Web Publication Manifest',
    required: true,
    format: 'https://readium.org/webpub-manifest/context.jsonld',
  })
  @JsonProperty('@context')
  @JsonType(String)
  @IsNotEmpty()
  @IsUrl()
  readonly context: string;

  @ApiModelProperty({
    description: 'Readium Web Publication Manifest MetadataDto',
    required: true,
    format: 'JSON Object, see MetadataDto Object Dto',
  })
  @JsonProperty('metadata')
  @JsonType(MetadataDto)
  @IsNotEmpty()
  // @IsJSON()
  @ValidateNested()
  readonly metadata: MetadataDto;

  @ApiModelProperty({
    description: 'LinksDto are expressed using the LinksDto key that contains one or more Link Objects',
    required: true,
    format: `A manifest must contain at least one link
     using the self relationship where href
     is an absolute URI to the canonical location of the manifest.`,
    type: LinksDto,
    isArray: true,
  })
  @JsonProperty('links')
  @JsonElementType(LinksDto)
  @JsonType(LinksDto)
  @IsNotEmpty()
  // @IsJSON()
  @ValidateNested()
  links: LinksDto[];

  @ApiModelProperty({
    description: 'Identifies a list of resources in reading order for the publication.',
    required: true,
    format: 'JSON Object',
    type: LinksDto,
    isArray: true,
  })
  @JsonProperty('readingOrder')
  @JsonElementType(LinksDto)
  @IsNotEmpty()
  // @IsJSON()
  @ValidateNested()
  readonly readingOrder: LinksDto[];

  @ApiModelProperty({
    description: 'Identifies resources that are necessary for rendering the publication.',
    required: true,
    format: 'JSON Object',
    type: LinksDto,
    isArray: true,
  })
  @JsonProperty('resources')
  @JsonElementType(LinksDto)
  @IsOptional()
  // @IsJSON()
  @ValidateNested()
  readonly resources: LinksDto[];

  @ApiModelProperty({
    description: 'Identifies the collection that contains a table of contents.',
    required: false,
    format: 'JSON Object',
    type: LinksDto,
    isArray: true,
  })
  @JsonProperty('toc')
  @JsonElementType(LinksDto)
  @IsOptional()
  // @IsJSON()
  @ValidateNested()
  readonly toc!: LinksDto[];
}
