import { IDFConv } from './../../core/interface/dfconv.interface';

export type Tdiscovery = (conv: IDFConv) => void;
export type Tsearch = (conv: IDFConv, title: string, author?: string) => void;
export type TnodeApi = Tdiscovery | Tsearch;
export type Tfuse = (search: string) => (array: string[]) => string[];

export interface Iapi {
  discovery: Tdiscovery;
  search: Tsearch;
  fuse: Tfuse; 
}