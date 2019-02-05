import * as mongoose from 'mongoose';

export const MetadataSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  identifier: {
    type: String,
    required: true,
  },
});

MetadataSchema.index({ title: 'text'});
