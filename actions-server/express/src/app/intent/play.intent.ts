import { getAudiobook, Eaudiobook } from './../service/audiobook.service';
import { DFConv } from './../app';
import { prompts } from '../prompt';

export const playIntent = async (conv: DFConv) => {
  if (!conv.utils.isCompatible()) {
    return ;
  }

  const chapter = conv.data.currentChapter++;
  const { audiobook } = conv.parameters;
  if (audiobook && audiobook !== '') {
    conv.data.currentName = audiobook as string;
  }
  try {
    const media = await getAudiobook(conv.data.currentName, chapter);
    if (media.state === Eaudiobook.OK || media.state === Eaudiobook.END_CHAPTER) {
      conv.contexts.set('playing_audiobook', 999);
      conv.utils.media(media, prompts.play_first, conv.data.currentName);
    } else {
      throw media.state.toString();
    }
  } catch (e) {
    conv.utils.ask(prompts.error, e);
  }
};
