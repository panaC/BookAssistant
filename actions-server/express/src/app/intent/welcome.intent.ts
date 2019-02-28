import { DFConv } from './../app';
import { prompts } from '../prompt';

export const welcomeIntent = (conv: DFConv) => {

  conv.data.currentChapter = 0;
  // conv.user.storage

  try {
    // const res = await Axios.get(SERVER_URL);
    // if (res.data) {
      // the payload feed is to heavy for a local storage
      // In this case : the simulator crash and quit l'app silently without seeing it
      // conv.data.feed = res.data;
    // }
  } catch (e) {
    //
  }
  conv.utils.ask(prompts.welcome);
};
