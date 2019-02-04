import { IMetadata } from './metadata.interface';
import { Document } from 'mongoose';
import { ILinks } from './links.interface';

export interface IWebpub extends Document {
  readonly context: string;
  readonly MetadataDto: IMetadata[];
  readonly LinksDto: ILinks[];
  readonly readingOrder: ILinks[];
  readonly ressources: ILinks[];
  readonly toc: ILinks[];

}
