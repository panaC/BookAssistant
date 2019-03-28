import { SEARCH } from '../../constants';
import Axios from 'axios';
import { ILinks } from '../../../../../opds-server/src/webpub/interfaces/links.interface';
import { IWebpub } from '../../../../../opds-server/src/webpub/interfaces/webpub.inteface';
import { Eaudiobook } from '../../database/interface/session.interface';
import { DFConv } from '../app';

export const getState = (state: Eaudiobook) => {
  return {
    state,
  };
};

export const getLink = (a: IWebpub) => a.links.filter((ln) => ln.rel === 'audiobook').pop();

export const getImg = (a: IWebpub) => a.resources.filter((ln) => ln.rel === 'cover').pop();

export class MediaService {
  constructor(private _conv: DFConv) {
  }

  private _title: string = undefined;
  private _author: string = undefined;
  private _webpub: IWebpub[];
  private _nb: number = 0;
  private _length: number = 0;
  private _state: Eaudiobook = Eaudiobook.OK;

  get webpub(): IWebpub {
    return this._webpub[this._nb];
  }

  set title(t: string) {
    this._title = t;
  }

  set author(a: string) {
    this._author = a;
  }

  public async length() {
    await this.getWebpub();
    if (this._state === Eaudiobook.OK) {
      return this._webpub.length;
    }
    return 0;
  }

  public async choice(nb: number) {
    if (this._length > nb && nb >= 0) {
      this._nb = nb;
      await this.getWebpub();
      if (this._state == Eaudiobook.OK) {
        this._conv.session.state.currentPlayingMedia = this.media();
        this._conv.session.save();
      }
    }
  }

  private media() {
    let a = this.webpub;
    let chapter = this._conv.session.state.chapterToPlay;
    let link: ILinks;

    if (chapter >= 0 && chapter < this.webpub.readingOrder.length) {
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
        webpub: this.webpub,
      };
    }
    return getState(this._state);
  }

  private async getWebpub(title: string = undefined, author: string = undefined) {
    const res = await Axios.get<IWebpub[]>(SEARCH(title || this._title, author || this._author));
    if (res && res.data && !res.data.length) {
      this._state = Eaudiobook.NOT_FOUND;
    } else if (!res || !res.data) {
      this._state = Eaudiobook.ERROR_AXIOS;
    }
    this._state = Eaudiobook.OK;
    this._webpub = res.data;
  }

}

