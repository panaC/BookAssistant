import { DFConv } from './../app';
import { prompts } from '../prompt';

export const welcome = (conv: DFConv) => {

  conv.data.chapterToPlay = 0;
  conv.data.titleTellByUser = '';
  conv.data.currentPlayingMedia = null;
  conv.user.storage.lastSeen = new Date(Date.now());
  if (!conv.user.storage.mediaIdentifier) {
    conv.user.storage.mediaIdentifier = {};
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
