import { Ilinks } from './links.interface';
import { Imetadata } from './metadata.interface';

export interface Iwebpub {
  readonly context: string;
  readonly metadata: Imetadata;
  readonly links: Ilinks[];
  readonly readingOrder: Ilinks[];
  readonly resources: Ilinks[];
  readonly toc: Ilinks[];
}
