import { IsessionStorage, IuserStorage } from './interface/storage.interface';
import { DialogflowConversation, Suggestions } from 'actions-on-google';
import { join } from 'path';
import { Iprompt } from './prompt';
import { sprintf } from 'sprintf-js';

export class Utils {
  constructor(public conv: DialogflowConversation<IsessionStorage, IuserStorage>) {
    this.conv = conv;

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
    i18n.setLocale(conv.user.locale);
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
