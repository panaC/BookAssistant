import { DFConv } from '../app';
import { prompts } from '../prompt';

export const noInput = (conv: DFConv) => {
  const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
  if (repromptCount === 0) {
    conv.utils.ask(prompts.default_noInput);
  } else if (repromptCount === 1) {
    conv.utils.ask(prompts.default_noInput);
  } else if (conv.arguments.get('IS_FINAL_REPROMPT')) {
    // doesn't work ! Didn't pass here because catch by Native Assistant before
    conv.utils.ask(prompts.default_noInput);
  }
};

export const goodbye = (conv: DFConv) => {
  conv.utils.close(prompts.default_goodbye);
};
