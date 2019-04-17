import {IDFConv} from './../../core/interface/dfconv.interface';
import {Ilinks} from './../api/interface/links.interface';

export type Tdiscovery = (conv: IDFConv) => void;
export type Tsearch = (conv: IDFConv, title: string, author?: string) => void;
export type TnodeApi = Tdiscovery|Tsearch;
export type Tfuse = (search: string) => (array: string[]) => string[];
export type TgetTrackWithRef = (readingOrder: Ilinks[], href: string) => number;
export type TgetHrefWithRef = (toc: Ilinks[], ref: string) => string|null;

export interface Iapi {
  discovery: Tdiscovery;
  search: Tsearch;
  fuse: Tfuse;
  refGetTrackWithRef: TgetTrackWithRef;
  refGetHrefWithRef: TgetHrefWithRef;
}