
// Make it class

const getChapterWithHref = (readingOrder: ILinks[], href: string) =>
  readingOrder.map((link) => link.href === href.split('#')[0]).findIndex((value) => value);

const searchHrefWithRef = (toc: ILinks[], ref: string): string => 
  toc.map((link) => 
    link.title === ref ? link.href :
      (link.children ? searchHrefWithRef(link.children, ref) : null))
    .reduce((a, c) => c, null);

export const getReference = async (identifier: string, ref: string): Promise<string[]> => {
  const res = await Axios.get(REF(identifier, ref));
  if (res && res.data && res.data.ref) {
    return res.data.ref;
  }
  return null;
}

export const getMediaReference = async (
    a: IplayingMedia
  , reference: string
  , nb: number = 0) => {
  let link: string;
  let chapter: number;
  let state: {
    state: Eaudiobook;
  }
  let ref: string[];

  if (a && a.state === Eaudiobook.OK) {
    if ((ref = await getReference(a.identifier, reference)) && ref.length > nb) {
      if ((link = searchHrefWithRef(a.toc, ref[nb]))) {
        if ((chapter = getChapterWithHref(a.readingOrder, link)) > -1) {
          const media = await getMedia(name, chapter);
          media.url = `${media.url}#${link.split('#')[1]}`;
          return media;
        }
      }
    }
    return getState(Eaudiobook.ERROR_REF);
  }
  return state;
}