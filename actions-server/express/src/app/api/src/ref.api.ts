import {Ilinks} from './../interface/links.interface';

export const getTrackWithHref =
    (readingOrder: Ilinks[], href: string): number =>
        readingOrder.map((link) => link.href === href.split('#')[0])
            .findIndex((value) => value);

export const getHrefWithRef = (toc: Ilinks[], ref: string): string|null =>
    toc.map(
           (link) => link.title === ref ?
               link.href :
               (link.children ? getHrefWithRef(link.children, ref) : null))
        .reduce((a, c) => c, null);

export const getRefWithTimecode =
    (toc: Ilinks[], href: string, timecode: number): string|null => {
      return toc
          .map((link) => {
            if (link.href.split('#')[0] === href &&
                (link.href.split('#t=').length === 1 ||
                 // tslint:disable-next-line:ban
                 timecode >= parseInt(link.href.split('#t=')[1], 10))) {
              if (link.children) {
                return getRefWithTimecode(link.children, href, timecode) ||
                    link.title;
              }
              return link.title;
            }
            return null;
          })
          .reduce((_a, c) => c, null);
    };

export const flattenToc = (toc: Ilinks[]): string[] => {
  let ret: string[] = [];
  toc.map((link) => {
    ret.push(link.title);
    if (link.children) {
      ret = [...ret, ...flattenToc(link.children)];
    }
  });
  return ret;
};

export const getPrevNextRefWithRef = (toc: Ilinks[], ref: string, nb: number): string|null => {
  const array = flattenToc(toc);
  const index = array.indexOf(ref) + nb;
  if (index <= 0 || index >= array.length) {
    return null;
  }
  return array[index];
};