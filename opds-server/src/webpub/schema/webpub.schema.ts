import { LINK_SELF_SERVER, SEARCH_URI } from './../../constants';
import { JSON } from 'ta-json-x';
import { LinksDto } from './../dto/links.dto';
import { LinksSchema } from './links.schema';
import { MetadataSchema } from './metadata.schema';
import { plainToClass } from 'class-transformer';
import * as mongoose from 'mongoose';

export const WebpubSchema = new mongoose.Schema({
  context: {
    type: String,
    required: true,
  },
  metadata: MetadataSchema,
  links: [LinksSchema],
  readingOrder: [LinksSchema],
  resources: [LinksSchema],
  toc: [LinksSchema],
});

WebpubSchema.pre('save', async function() {
  const webpub: any = this;

  if (!webpub.links) {
    webpub.links = new Array();
  }
  webpub.links.push(plainToClass<LinksDto, LinksDto>(LinksDto,
    JSON.parse<LinksDto>(LINK_SELF_SERVER(`?${SEARCH_URI}=${encodeURI(webpub.metadata.title)}`), LinksDto)));
});
