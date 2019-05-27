import { Iwebpub } from "./webpub.interface";

export interface IbookData {
  manifest: Iwebpub;
  currentTrack: number;
  currentRef?: string;
}

