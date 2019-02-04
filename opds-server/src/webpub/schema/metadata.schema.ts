import * as mongoose from 'mongoose';

export const MetadataSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  identifier: {
    type: String,
    required: true,
  },
});
