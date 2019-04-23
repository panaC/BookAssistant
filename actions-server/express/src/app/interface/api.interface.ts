import {IDFConv} from './../../core/interface/dfconv.interface';
import {Ilinks} from './../api/interface/links.interface';

export type Tdiscovery = (conv: IDFConv) => Promise<void>;
export type Tsearch = (conv: IDFConv, title: string, author?: string) => Promise<void>;
export type TnodeApi = Tdiscovery|Tsearch;
export type Tfuse = (array: string[]) => (search: string) => string[];
export type TgetTrackWithHref = (readingOrder: Ilinks[], href: string) => number;
export type TgetHrefWithRef = (toc: Ilinks[], ref: string) => string|null;
export type TgetPrevNextWithRef = (toc: Ilinks[], ref: string, nb: number) => string|null;
export type TflattenToc = (toc: Ilinks[]) => string[];
export type TgetRefWithTimecode = (toc: Ilinks[], href: string, timecode: number) => string|null;

export interface Iapi {
  discovery: Tdiscovery;
  search: Tsearch;
  fuse: Tfuse;
  refGetTrackWithHref: TgetTrackWithHref;
  refGetHrefWithRef: TgetHrefWithRef;
  refGetRefWithTimecode: TgetRefWithTimecode;
  refGetPrevNextRefWithRef : TgetPrevNextWithRef;
  flattenToc: TflattenToc;
}