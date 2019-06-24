import { Iwebpub } from "./webpub.interface";

export interface IbookData {
  manifest: Iwebpub;
  currentTrack: number;
  currentOffset: number;
  currentRef?: string;
}

