import { SEARCH } from './../../constants';
import Axios from 'axios';
import { ILinks } from './../../../../../opds-server/src/webpub/interfaces/links.interface';
import { IWebpub } from './../../../../../opds-server/src/webpub/interfaces/webpub.inteface';
import { IplayingMedia } from '../interface/storage.interface';

export enum Eaudiobook {
  ERROR_AXIOS = 'error.audiobook.network',
  END_CHAPTER = 'play.finish',
  ERROR_CHAPTER = 'error.audiobook.chapter',
  NOT_FOUND = 'error.audiobook.not_found',
  ERROR_REF = 'error.audiobook.ref',
  OK = 'ok',
}

const getState = (state: Eaudiobook) => {
  return {
    state,
  };
};

const getLink = (a: IWebpub) => a.links.filter((ln) => ln.rel === 'audiobook').pop();

const getImg = (a: IWebpub) => a.resources.filter((ln) => ln.rel === 'cover').pop();

const getAudiobook = async (name: string) => {
  const res = await Axios.get(SEARCH(name));
  if (res && res.data && !res.data.length) {
    return [getState(Eaudiobook.NOT_FOUND)];
  } else if (!res || !res.data) {
    return [getState(Eaudiobook.ERROR_AXIOS)];
  }
  return [getState(Eaudiobook.OK), res.data[0]];
}

export const getMedia = async (name: string, chapter: number): Promise<IplayingMedia> => {
  let a: IWebpub;
  let link: ILinks;
  let state: {
    state: Eaudiobook;
  }

  [state, a] = await getAudiobook(name);
  if (state.state === Eaudiobook.OK) {
    if (a.readingOrder && a.readingOrder.length) {
      if (chapter === a.readingOrder.length) {
        return getState(Eaudiobook.END_CHAPTER);
      } else if (chapter > a.readingOrder.length) {
        return getState(Eaudiobook.ERROR_CHAPTER);
      }
      link = a.readingOrder[chapter];
    } else {
      if (chapter > 0) {
        return getState(Eaudiobook.END_CHAPTER);
      } else if (!(link = getLink(a))) {
        return getState(Eaudiobook.NOT_FOUND);
      }
    }
    const img = getImg(a);
    return {
      state: Eaudiobook.OK,
      name: a.metadata.title,
      url: link.href,
      description: a.metadata.identifier,
      identifier: a.metadata.identifier,
      img: (img) ? {
        url: img.href,
        alt: img.title,
      } : null,
      chapter,
      numberOfChapter: (a.readingOrder.length || 1),
    };
  }
  return state;
};

const getChapterWithHref = (readingOrder: ILinks[], href: string) =>
  readingOrder.map((link) => link.href === href.split('#')[0]).findIndex((value) => value);

const searchHrefWithRef = (toc: ILinks[], ref: string): string => 
  toc.map((link) => 
    link.title === ref ? link.href :
      (link.children ? searchHrefWithRef(link.children, ref) : null))
    .reduce((value) => value);

export const getMediaReference = async (name: string, reference: string) => {
  let a: IWebpub;
  let link: string;
  let chapter: number;
  let state: {
    state: Eaudiobook;
  }

  [state, a] = await getAudiobook(name);
  if (state.state === Eaudiobook.OK) {
    if ((link = searchHrefWithRef(a.toc, reference))) {
      if ((chapter = getChapterWithHref(a.readingOrder, link))) {
        const media = await getMedia(name, chapter);
        media.url = `${media.url}#${link.split('#')[1]}`;
        return media;
      }
    }
    return getState(Eaudiobook.ERROR_REF);
  }
  return state;
}