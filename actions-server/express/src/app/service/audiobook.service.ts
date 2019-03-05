import { SEARCH } from './../../constants';
import Axios from 'axios';
import { ILinks } from './../../../../../opds-server/src/webpub/interfaces/links.interface';
import { IWebpub } from './../../../../../opds-server/src/webpub/interfaces/webpub.inteface';
import { Iaudiobook } from '../interface/storage.interface';

export enum Eaudiobook {
  ERROR_AXIOS = 'Network error',
  END_CHAPTER = 'End of book',
  ERROR_CHAPTER = 'Unknown chapter',
  NOT_FOUND = 'Audiobook not found',
  OK = 'ok',
}

export const getAudiobook = async (name: string, chapter: number): Promise<Iaudiobook> => {
  let a: IWebpub;
  let link: ILinks;

  const res = await Axios.get(SEARCH(name));
  if (res && res.data && res.data[0]) {
    a = res.data[0];

    // here test in first if the toc is set
    if (a.readingOrder && a.readingOrder.length) {
      if (chapter === a.readingOrder.length) {
        return {
          state: Eaudiobook.END_CHAPTER,
        };
      } else if (chapter > a.readingOrder.length) {
        return {
          state: Eaudiobook.ERROR_CHAPTER,
        };
      }
      link = a.readingOrder[chapter];
    } else {
      link = a.links.filter((ln) => ln.rel === 'audiobook').pop();
      if (chapter > 0) {
        return {
          state: Eaudiobook.END_CHAPTER,
        };
      } else if (!link) {
        return {
          state: Eaudiobook.NOT_FOUND,
        };
      }
    }
    const img = a.resources.filter((ln) => ln.rel === 'cover').pop();

    return {
      state: Eaudiobook.OK,
      name: a.metadata.title,
      url: link.href,
      description: a.metadata.identifier,
      img: (img) ? {
        url: img.href,
        alt: img.title,
      } : null,
      webpub: a,
      chapter,
      numberOfChapter: (a.readingOrder.length || 1), /* here change for toc */
    };
  } else {
    return {
      state: Eaudiobook.ERROR_AXIOS,
    };
  }
};
