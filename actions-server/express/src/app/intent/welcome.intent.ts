import { DFConv } from './../app';
import { prompts } from '../prompt';

export const welcome = (conv: DFConv) => {
  if (!conv.user.storage.id) {
    conv.user.storage.id = conv.session._id;
  }
  conv.utils.ask(prompts.welcome);
};
