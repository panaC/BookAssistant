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
import { JsonProperty, JsonType, JsonObject } from 'ta-json-x';
import { IsNotEmpty, IsUrl, IsJSON, IsOptional } from 'class-validator';

@JsonObject()
export class Metadata {

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
  })
  @JsonProperty('title')
  @JsonType(String)
  @IsNotEmpty()
  readonly title: string;

  @ApiModelProperty({
    description: 'unique identifier of publication',
    required: false,
  })
  @JsonProperty('identifier')
  @JsonType(String)
  @IsOptional()
  identifier: string;


  // Add compulsory dateCreated dateModified
}
