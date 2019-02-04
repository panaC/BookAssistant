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
import { JsonProperty, JsonType, JsonObject } from 'ta-json-x';
import { IsNotEmpty, IsUrl, IsJSON, ValidateNested, IsOptional, validateSync } from 'class-validator';
import { Metadata } from './metdata.dto';
import { Links } from './links.dto';

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
    description: 'Readium Web Publication Manifest metadata',
    required: true,
    format: 'JSON Object, see Metadata Object Dto',
  })
  @JsonProperty('metadata')
  @JsonType(Metadata)
  @IsNotEmpty()
  @IsJSON()
  @ValidateNested()
  readonly metadata: Metadata;

  @ApiModelProperty({
    description: 'Links are expressed using the links key that contains one or more Link Objects',
    required: true,
    format: `A manifest must contain at least one link
     using the self relationship where href
     is an absolute URI to the canonical location of the manifest.`,
  })
  @JsonProperty('links')
  @JsonType(Links)
  @IsNotEmpty()
  @IsJSON()
  @ValidateNested()
  readonly links: Links[];

  @ApiModelProperty({
    description: 'Identifies a list of resources in reading order for the publication.',
    required: true,
    format: 'JSON Object',
  })
  @JsonProperty('readingOrder')
  @JsonType(Links)
  @IsNotEmpty()
  @IsJSON()
  @ValidateNested()
  readonly readingOrder: Links[];

  @ApiModelProperty({
    description: 'Identifies resources that are necessary for rendering the publication.',
    required: true,
    format: 'JSON Object',
  })
  @JsonProperty('ressources')
  @JsonType(Links)
  @IsOptional()
  @IsJSON()
  @ValidateNested()
  readonly ressources: Links[];

  @ApiModelProperty({
    description: 'Identifies the collection that contains a table of contents.',
    required: false,
    format: 'JSON Object',
  })
  @JsonProperty('toc')
  @JsonType(Links)
  @IsOptional()
  @IsJSON()
  @ValidateNested()
  readonly toc: Links[];
}
