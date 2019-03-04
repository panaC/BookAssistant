import { SEARCH } from './../../constants';
import Axios from 'axios';
import { ILinks } from './../../../../../opds-server/src/webpub/interfaces/links.interface';
import { IWebpub } from './../../../../../opds-server/src/webpub/interfaces/webpub.inteface';
import { Iaudiobook } from '../interface/storage.interface';

export enum Eaudiobook {
  ERROR_AXIOS,
  END_CHAPTER,
  ERROR_CHAPTER,
  NOT_FOUND,
  OK,
}

export const getAudiobook = async (name: string, chapter: number): Promise<Iaudiobook> => {
  let a: IWebpub;
  let link: ILinks;
  let state: Eaudiobook = Eaudiobook.OK;

  const res = await Axios.get(SEARCH(name));
  if (res && res.data && res.data[0]) {
    a = res.data[0];

    // here test in first if the toc is set
    if (a.readingOrder && a.readingOrder.length) {
      if (chapter === a.readingOrder.length) {
        state = Eaudiobook.END_CHAPTER;
      } else if (chapter < a.readingOrder.length) {
        state = Eaudiobook.ERROR_CHAPTER;
      } else {
        link = a.readingOrder[chapter];
      }
    } else {
      link = a.links.filter((ln) => ln.rel === 'audiobook').pop();
      state = Eaudiobook.END_CHAPTER;
      if (!link) {
        return {
          state: Eaudiobook.NOT_FOUND,
        };
      }
    }
    const img = a.resources.filter((ln) => ln.rel === 'cover').pop();

    return {
      state,
      name: a.metadata.title,
      url: link.href,
      description: a.metadata.identifier,
      img: (img) ? {
        url: img.href,
        alt: img.title,
      } : null,
      webpub: a,
      chapter,
      numberOfChapter: a.readingOrder.length, /* here change for toc */
    };
  } else {
    return {
      state: Eaudiobook.ERROR_AXIOS,
    };
  }
};
