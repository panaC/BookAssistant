import {Ilinks} from './links.interface';
import {Iwebpub} from './webpub.interface';

export interface Iopds {
  metadata: {title: string;};
  links: Ilinks;
  navigation: Ilinks;
  facets: Iopds;
  groups: Iopds;
  publication: Iwebpub;
}