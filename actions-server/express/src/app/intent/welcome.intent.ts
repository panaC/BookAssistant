import { DFConv } from './../app';
import { prompts } from '../prompt';

export const welcome = (conv: DFConv) => {

  conv.data.currentChapter = 0;
  conv.data.currentName = '';
  conv.data.media = null;
  conv.user.storage.lastSeen = new Date(Date.now());
  if (!conv.user.storage.mediaIdentifier) {
    console.log("here");
    
    conv.user.storage.mediaIdentifier = new Map<string, number>();
  }

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
