import { DFConv } from './../app';
import { prompts } from '../prompt';

export const noInput = (conv: DFConv) => {
  const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
  if (repromptCount === 0) {
  conv.ask(`1er essai`);
  } else if (repromptCount === 1) {
  conv.ask(`2eme essai`);
  } else if (conv.arguments.get('IS_FINAL_REPROMPT')) {
  conv.ask(`3eme essai`);
  }
  //conv.utils.ask(prompts.default_noInput);
};

export const goodbye = (conv: DFConv) => {
  conv.utils.close(prompts.default_goodbye);
};
