import { Document } from 'mongoose';

export interface IMetadata extends Document {
  readonly type: string;
  readonly title: string;
  identifier: string;
  readonly dateCreated: Date;
  dateModified: Date;
  readonly duration: string;
  readonly readBy: string;
  readonly bitrate: string;
  readonly contentSize: string;
  readonly encodingFormat: string;
  readonly published: string;
  readonly isbn: string;
  readonly numberOfPages: number;
  readonly illustrator: string;
  readonly bookFormat: string;
  readonly bookEdition: string;
  readonly author: string;
  readonly publisher: string;
  readonly description: string;
  readonly language: string;
  readonly award: string;
  readonly comment: string;
  readonly genre: string;
  readonly editor: string;
  readonly version: string;
  readonly url: string;
  readonly corpus: string;

}
