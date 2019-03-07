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
  dateCreated: {
    type: Date,
    required: true,
  },
  dateModified: {
    type: Date,
    required: false,
  },
  duration: {
    type: String,
    required: false,
  },
  readBy: {
    type: String,
    required: false,
  },
  bitrate: {
    type: String,
    required: false,
  },
  contentSize: {
    type: String,
    required: false,
  },
  encodingFormat: {
    type: String,
    required: false,
  },
  published: {
    type: String,
    required: false,
  },
  isbn: {
    type: String,
    required: false,
  },
  numberOfPages: {
    type: Number,
    required: false,
  },
  illustrator: {
    type: String,
    required: false,
  },
  bookFormat: {
    type: String,
    required: false,
  },
  bookEdition: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  publisher: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  language: {
    type: String,
    required: false,
  },
  award: {
    type: String,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
  genre: {
    type: String,
    required: false,
  },
  editor: {
    type: String,
    required: false,
  },
  version: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  corpus: {
    type: String,
    required: false,
  },
});

MetadataSchema.index(
  { title: 'text' },
  { default_language: 'french' },
);
