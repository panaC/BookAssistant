import { IMetadata } from './metadata.interface';
import { Document } from 'mongoose';
import { ILinks } from './links.interface';

export interface IWebpub extends Document {
  readonly context: string;
  readonly metadata: IMetadata;
  readonly links: ILinks[];
  readonly readingOrder: ILinks[];
  readonly resources: ILinks[];
  readonly toc: ILinks[];

}
