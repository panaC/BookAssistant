import { OpdsDto } from './../../../../../opds-server/src/webpub/opds/dto/opds.dto';
import { IWebpub } from './../../../../../opds-server/src/webpub/interfaces/webpub.inteface';
import { Eaudiobook } from '../service/audiobook.service';

export interface IsessionStorage {
  feed: OpdsDto;
  currentWebpub: IWebpub;
  currentChapter: number;
  currentName: string;
}

export interface Iaudiobook {
  state: Eaudiobook;
  name?: string;
  url?: string;
  description?: string;
  img?: {
    url: string,
    alt: string,
  };
  webpub?: IWebpub;
  chapter?: number;
  numberOfChapter?: number;
}

export interface IuserStorage {
  audiobook: Iaudiobook[];
  lastSeen: Date;
}
