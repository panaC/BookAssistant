import { LinksSchema } from './links.schema';
import { MetadataSchema } from './metadata.schema';
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
