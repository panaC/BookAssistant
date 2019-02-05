/*
 * File: metadataOpds.dto.ts
 * Project: opds-server
 * File Created: Tuesday, 5th February 2019 1:34:19 pm
 * Author: pierre (p.leroux@gmx.com)
 * -----
 * Last Modified: Tuesday, 5th February 2019 1:34:28 pm
 * Modified By: pierre (p.leroux@gmx.com>)
 * -----
 * Copyright 2018 - 2019 tennai.com
 */

import { ApiModelProperty } from '@nestjs/swagger';
import { JsonProperty, JsonType, JsonObject } from 'ta-json-x';

@JsonObject()
export class MetadataOpdsDto {

  @ApiModelProperty({
    description: 'title of publication',
    required: true,
    format: 'Unique String',
  })
  @JsonProperty('title')
  @JsonType(String)
  title: string;
}
