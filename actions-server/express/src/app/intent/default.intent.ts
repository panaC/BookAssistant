import { DFConv } from './../app';
import { prompts } from '../prompt';

export const noInput = (conv: DFConv) => {
  conv.utils.ask(prompts.default_noInput);
};

export const goodbye = (conv: DFConv) => {
  conv.utils.close(prompts.default_goodbye);
};
