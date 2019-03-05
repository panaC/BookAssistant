import { getAudiobook, Eaudiobook } from './../service/audiobook.service';
import { DFConv } from './../app';
import { prompts } from '../prompt';

export const play = async (conv: DFConv) => {
  if (conv.utils.isNotCompatible()) {
    return conv.utils.ask(prompts.not_compatible);
  }

  console.log(conv.user.storage.mediaIdentifier && typeof conv.user.storage.mediaIdentifier);
  

  const { audiobook } = conv.parameters;
  if (audiobook && audiobook.toString() !== '') {
    conv.data.currentName = audiobook as string;
    conv.data.currentChapter = 0;
  } else if (!conv.data.media ||
    conv.data.currentChapter >= conv.data.media.numberOfChapter ||
    conv.data.currentChapter < 0) {
    conv.data.currentChapter = 0;
  }

  try {
    const media = await getAudiobook(conv.data.currentName, conv.data.currentChapter);
    if (media.state === Eaudiobook.OK) {
      if (conv.user.storage.mediaIdentifier.has(media.identifier) &&
      (!conv.data.media || conv.data.media.identifier !== media.identifier)) {
        const previousChapter = conv.user.storage.mediaIdentifier.get(media.identifier);
        conv.data.currentChapter = previousChapter;
        conv.data.media = media;
        conv.contexts.set('play_audiobook-yes_no', 3);
        return conv.utils.ask(prompts.play_already_listen
          , conv.data.currentName
          , previousChapter.toString());
      }
      conv.data.media = media;
      conv.user.storage.mediaIdentifier.set(media.identifier, media.chapter);
      conv.utils.media(media,
        (conv.data.currentChapter === 0 ?
          prompts.play_first :
          prompts.play_follow),
        conv.data.currentName);
    } else {
      throw media.state.toString();
    }
  } catch (e) {
    conv.utils.ask(prompts.error, e);
  }
};

export const playPrev = async (conv: DFConv) => {
  conv.data.currentChapter -= 2;
  await play(conv);
};

export const playNext = async (conv: DFConv) => {
  ++conv.data.currentChapter;
  await play(conv);
};

export const playNo = async (conv: DFConv) => {
  conv.data.currentChapter = 0;
  await play(conv);
};
