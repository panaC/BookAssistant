import * as mongoose from 'mongoose';

export const LinksSchema = new mongoose.Schema({
  href: {
    type: String,
    required: true,
  },
  templated: {
    type: Boolean,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  rel: {
    type: String,
    required: false,
  },
  /*
    properties: Properties
  */
  height: {
    type: Number,
    required: false,
  },
  width: {
    type: Number,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
  bitrate: {
    type: Number,
    required: false,
  },
});

LinksSchema.add({
  children: [LinksSchema],
});
