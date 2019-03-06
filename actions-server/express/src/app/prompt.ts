import i18n from 'i18n';
import { join } from 'path';

export interface Iprompt {
  elements: string[];
  suggestions: string[];
}

interface Iprompts {
  [name: string]: Iprompt;
}

i18n.configure({
  directory: join(__dirname, '/locales'),
  objectNotation: true,
  fallbacks: {
    'fr-FR': 'fr',
    'fr-CA': 'fr',
    'en-US': 'en',
    'en-GB': 'en',
  },
  defaultLocale: 'fr',
});

export const setLocale = (local: string) => { i18n.setLocale(local); };

export const prompts: Iprompts = {
  error: {
    elements: [
      i18n.__('error.global'),
    ],
    suggestions: [],
  },
  welcome: {
    elements: [
      i18n.__('welcome.home'),
    ],
    suggestions: [
      i18n.__('instruction.want_listen'),
    ],
  },
  play_first: {
    elements: [
      i18n.__('play.first'),
    ],
    suggestions: [
      i18n.__('play.suggestion.next'),
      i18n.__('play.suggestion.prev'),
    ],
  },
  play_follow: {
    elements: [
      i18n.__('play.follow'),
    ],
    suggestions: [
      i18n.__('play.suggestion.next'),
      i18n.__('play.suggestion.prev'),
    ],
  },
  play_finish: {
    elements: [
      i18n.__('play.finish'),
    ],
    suggestions: [],
  },
  play_already_listen: {
    elements: [
      i18n.__('already_listen.answer'),
    ],
    suggestions: [
      i18n.__('yes_no.yes'),
      i18n.__('yes_no.no'),
    ],
  },
  default_noInput: {
    elements: [
      i18n.__('default.no_input'),
    ],
    suggestions: [],
  },
  default_goodbye: {
    elements: [
      i18n.__('default.goodbye'),
    ],
    suggestions: [],
  },
  not_compatible: {
    elements: [
      i18n.__('utils.playing_is_compatible'),
    ],
    suggestions: [],
  },
};
