import { Document } from 'mongoose';

export interface ILinks extends Document {
  readonly href: string;
  readonly templated: boolean;
  readonly type: string;
  readonly title: string;
  readonly rel: string;
  // readonly properties: Properties;
  readonly height: number;
  readonly width: number;
  readonly duration: number;
  readonly bitrate: number;
  readonly children: ILinks[];
}
