import { Document } from 'mongoose';

export interface IMetadata extends Document {
  readonly type: string;
  readonly title: string;
  identifier: string;

}
