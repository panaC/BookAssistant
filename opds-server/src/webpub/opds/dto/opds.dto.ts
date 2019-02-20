/*
 * File: opds.dto.ts
 * Project: opds-server
 * File Created: Tuesday, 5th February 2019 12:23:45 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Tuesday, 5th February 2019 12:24:18 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2018 - 2019 tennai.com
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { JsonProperty, JsonType, JsonObject, JsonElementType, JsonConverter } from 'ta-json-x';
import { IsNotEmpty, IsUrl, IsJSON, ValidateNested, IsOptional, validateSync } from 'class-validator';
import { LinksDto } from '../../dto/links.dto';
import { WebpubDto } from '../../dto/webpub.dto';
import { MetadataOpdsDto } from './metadataOpds.dto';

@JsonObject()
export class OpdsDto {

  @ApiModelProperty({
    description: 'OPDS2 Metadata',
    required: true,
    format: 'JSON Object, see MetadataDto Object Dto',
  })
  @JsonProperty('metadata')
  @JsonType(MetadataOpdsDto)
  @IsNotEmpty()
  // @IsJSON()
  @ValidateNested()
  metadata: MetadataOpdsDto;

  @ApiModelProperty({
    description: 'LinksDto are expressed using the LinksDto key that contains one or more Link Objects',
    required: true,
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
    description: 'LinksDto are expressed using the LinksDto key that contains one or more Link Objects',
    required: false,
    type: LinksDto,
    isArray: true,
  })
  @JsonProperty('navigation')
  @JsonElementType(LinksDto)
  @JsonType(LinksDto)
  @IsNotEmpty()
  // @IsJSON()
  @ValidateNested()
  navigation: LinksDto[];

  @ApiModelProperty({
    description: 'Facets OPDS2',
    required: false,
    type: OpdsDto,
    isArray: true,
  })
  @JsonProperty('facets')
  @JsonElementType(OpdsDto)
  @JsonType(OpdsDto)
  @IsNotEmpty()
  @ValidateNested()
  facets: OpdsDto[];

  @ApiModelProperty({
    description: 'Groups OPDS2',
    required: false,
    type: OpdsDto,
    isArray: true,
  })
  @JsonProperty('groups')
  @JsonElementType(OpdsDto)
  @JsonType(OpdsDto)
  @IsNotEmpty()
  // @IsJSON()
  @ValidateNested()
  groups: OpdsDto[];

  @ApiModelProperty({
    description: 'Publication OPDS2',
    required: true,
    type: OpdsDto,
    isArray: true,
  })
  @JsonProperty('publication')
  @JsonElementType(WebpubDto)
  @JsonType(WebpubDto)
  @IsNotEmpty()
  // @IsJSON()
  @ValidateNested()
  publication: WebpubDto[];
}
