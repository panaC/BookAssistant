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
  welcome: {
    elements: [
      i18n.__('welcome.home'),
    ],
    suggestions: [
      i18n.__('instruction.want_listen'),
    ],
  },
};
