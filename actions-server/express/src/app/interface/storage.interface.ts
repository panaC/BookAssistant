import { OpdsDto } from './../../../../../opds-server/src/webpub/opds/dto/opds.dto';
import { IWebpub } from './../../../../../opds-server/src/webpub/interfaces/webpub.inteface';

export interface IsessionStorage {
  feed: OpdsDto;
  currentWebpub: IWebpub;
  currentChapter: number;
  currentName: string;
}

export interface Iaudiobook {
  name: string;
  webpub: IWebpub;
  chapter: number;
}

export interface IuserStorage {
  audiobook: Iaudiobook[];
  lastSeen: Date;
}
