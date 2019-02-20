/*
 * File: LinksDto.dto.ts
 * Project: VoiceAssistant
 * File Created: Monday, 4th February 2019 11:41:04 am
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Monday, 4th February 2019 11:41:17 am
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2019 - 2019 EDRLab.org
 * Use of this source code is governed by a BSD-style license
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { JsonProperty, JsonType, JsonObject, JsonElementType } from 'ta-json-x';
import { IsNotEmpty
  , IsUrl
  , IsOptional
  , IsBoolean
  , IsString
  , ValidateNested
  , IsInt
  , Min
  , Max
  , IsNumber } from 'class-validator';

@JsonObject()
export class LinksDto {

  @ApiModelProperty({
    description: 'URI or URI template of the linked resource',
    required: true,
    format: 'URI or URI template',
  })
  @JsonProperty('href')
  @JsonType(String)
  @IsNotEmpty()
  @IsUrl()
  href: string;

  @ApiModelProperty({
    description: 'Indicates that href is a URI template. Required Only when href is a URI template',
    required: false,
    format: 'Boolean, defaults to false',
  })
  @JsonProperty('templated')
  @JsonType(Boolean)
  @IsOptional()
  @IsBoolean()
  templated: boolean;

  // MIME Media type format
  @ApiModelProperty({
    description: 'Media type of the linked resource',
    required: false,
    format: 'MIME Media Type',
  })
  @JsonProperty('type')
  @JsonType(String)
  @IsOptional()
  @IsString()
  type: string;

  @ApiModelProperty({
    description: 'Title of the linked resource',
    required: false,
  })
  @JsonProperty('title')
  @JsonType(String)
  @IsOptional()
  @IsString()
  title: string;

  @ApiModelProperty({
    description: 'Relation between the resource and its containing collection',
    required: false,
  })
  @JsonProperty('rel')
  @JsonType(String)
  @IsOptional()
  @IsString()
  rel: string;

  /*
  // Not implemented yet
  // https://github.com/readium/webpub-manifest/blob/master/properties.md
  @ApiModelProperty()
  @JsonProperty('properties')
  @JsonType(String)
  @IsOptional()
  @IsJSON()
  @ValidateNested()
  readonly properties: Properties;
  */

  @ApiModelProperty({
    description: 'Height of the linked resource in pixels',
    required: false,
  })
  @JsonProperty('height')
  @JsonType(Number)
  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(10000)
  readonly height: number;

  @ApiModelProperty({
    description: 'Width of the linked resource in pixels',
    required: false,
  })
  @JsonProperty('width')
  @JsonType(Number)
  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(10000)
  readonly width: number;

  @ApiModelProperty({
    description: 'Duration of the linked resource in seconds',
    required: false,
    format: 'float',
  })
  @JsonProperty('duration')
  @JsonType(Float32Array)
  @IsOptional()
  @IsNumber()
  readonly duration: number;

  @ApiModelProperty({
    description: 'Bit rate of the linked resource in kilobits per second',
    required: false,
    format: 'float',
  })
  @JsonProperty('bitrate')
  @JsonType(Float32Array)
  @IsOptional()
  @IsNumber()
  readonly bitrate: number;

  @ApiModelProperty({
    description: 'Resources that are children of the linked resource, in the context of a given collection role',
    required: false,
    format: 'One or more Link Objects',
    // cannot type here because infinite loop in swagger
  })
  @JsonProperty('children')
  @JsonElementType(LinksDto)
  @IsOptional()
  // @IsJSON()
  @ValidateNested()
  readonly children: LinksDto[];
}
