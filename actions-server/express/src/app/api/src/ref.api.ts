import { Ilinks } from './../interface/links.interface';

export const getTrackWithHref = (readingOrder: Ilinks[], href: string): number =>
  readingOrder.map((link) => link.href === href.split('#')[0]).findIndex((value) => value);

export const getHrefWithRef = (toc: Ilinks[], ref: string): string | null => 
  toc.map((link) => 
    link.title === ref ? link.href :
      (link.children ? getHrefWithRef(link.children, ref) : null))
    .reduce((a, c) => c, null);
