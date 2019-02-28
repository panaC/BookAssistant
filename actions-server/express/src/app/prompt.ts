import i18n from 'i18n';

export interface Iprompt {
  elements: string[];
  suggestions: string[];
}

interface Iprompts {
  [name: string]: Iprompt;
}

export const prompts: Iprompts = {
  welcome: {
    elements: [
      i18n.__('welcome.home'),
    ],
    suggestions: [
      i18n.__('instruction.play_book'),
    ],
  },
};
