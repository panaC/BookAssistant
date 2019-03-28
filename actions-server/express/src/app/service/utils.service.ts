import i18n from 'i18n';
import { IplayingMedia } from '../interface/storage.interface';
import { Suggestions, MediaObject, Image } from 'actions-on-google';
import { Iprompt } from '../prompt';
import { sprintf } from 'sprintf-js';
import { setLocale } from '../prompt';
import { Eaudiobook } from '../../database/interface/session.interface';
import { DFConv } from '../app';

// middleware Utils service
// request from app.middleware
export class UtilsService {
  constructor(public conv: DFConv) {
    this.conv = conv;
    setLocale(conv.user.locale);
  }

  isNotCompatible() {
    if (!this.conv.surface.capabilities.has('actions.capability.MEDIA_RESPONSE_AUDIO')) {
      this.conv.close(i18n.__('utils.playing_is_compatible'));
      return true;
    }
    return false;
  }

  media(media: IplayingMedia, prompt: Iprompt, ...args: Array<string | number>) {
    if (media.state === Eaudiobook.OK || media.state === Eaudiobook.END_CHAPTER) {
      prompt.elements.forEach(element => {
        this.conv.ask(sprintf(element, ...args));
      });
      this.conv.ask(new MediaObject({
        name: media.name,
        description: media.description,
        url: media.url,
        icon: (media.img) ? new Image({
          url: media.img.url,
          alt: media.img.alt,
        }) : null,
      }));
      prompt.suggestions.forEach(sugg => {
        this.conv.ask(new Suggestions(sugg));
      });
    }
  }

  ask(prompt: Iprompt, ...args: Array<string | number>) {
    prompt.elements.forEach(element => {
      this.conv.ask(sprintf(element, ...args));
    });
    prompt.suggestions.forEach(sugg => {
      this.conv.ask(new Suggestions(sugg));
    });
  }

  close(prompt: Iprompt, ...args: Array<string | number>) {
    prompt.elements.forEach(element => {
      this.conv.close(sprintf(element, ...args));
    });
    prompt.suggestions.forEach(sugg => {
      this.conv.close(new Suggestions(sugg));
    });
  }
}
