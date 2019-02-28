import { IsessionStorage, IuserStorage } from './interface/storage.interface';
import { DialogflowConversation, Suggestions } from 'actions-on-google';
import { Iprompt } from './prompt';
import { sprintf } from 'sprintf-js';
import { setLocale } from './prompt';

export class Utils {
  constructor(public conv: DialogflowConversation<IsessionStorage, IuserStorage>) {
    this.conv = conv;
    setLocale(conv.user.locale);
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
