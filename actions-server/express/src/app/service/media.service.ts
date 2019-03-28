import { SEARCH, REF } from '../../constants';
import Axios from 'axios';
import { ILinks } from '../../../../../opds-server/src/webpub/interfaces/links.interface';
import { IWebpub } from '../../../../../opds-server/src/webpub/interfaces/webpub.inteface';
import { IplayingMedia } from '../interface/storage.interface';
import { Eaudiobook } from '../../database/interface/session.interface';

export const getState = (state: Eaudiobook) => {
  return {
    state,
  };
};

const getLink = (a: IWebpub) => a.links.filter((ln) => ln.rel === 'audiobook').pop();

const getImg = (a: IWebpub) => a.resources.filter((ln) => ln.rel === 'cover').pop();


// get audiobook needed title and/or author
// how implement this ?

const getAudiobook = async (name: string, author: string = undefined) => {
  const res = await Axios.get(SEARCH(name, author));
  if (res && res.data && !res.data.length) {
    return [getState(Eaudiobook.NOT_FOUND)];
  } else if (!res || !res.data) {
    return [getState(Eaudiobook.ERROR_AXIOS)];
  }
  return [getState(Eaudiobook.OK), res.data];
}

export const getMedia = async (
    name: string
  , chapter: number = 0
  , author: string = undefined
  , nb: number = 0): Promise<IplayingMedia> => {

  let data: IWebpub[];
  let a: IWebpub;
  let link: ILinks;
  let state: {
    state: Eaudiobook;
  }

  [state, data] = await getAudiobook(name, author);
  if (state.state === Eaudiobook.OK && nb < data.length && nb >= 0) {
    a = data[nb];
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
      author: a.metadata.author,
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

