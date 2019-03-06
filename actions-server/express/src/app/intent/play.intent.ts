import { getAudiobook, Eaudiobook } from './../service/audiobook.service';
import { DFConv } from './../app';
import { prompts } from '../prompt';

const playMedia = (conv: DFConv) => {
  conv.utils.media(conv.data.currentPlayingMedia,
    (conv.data.currentPlayingMedia.chapter === 0 ?
      prompts.play_first :
      prompts.play_follow),
    conv.data.currentPlayingMedia.name);
};

const playAnswer = (conv: DFConv) => {
  conv.contexts.set('play_audiobook-yes_no', 3);
  conv.utils.ask(prompts.play_already_listen
    , conv.data.currentPlayingMedia.name
    , (conv.user.storage.mediaIdentifier[conv.data.currentPlayingMedia.identifier] + 1).toString());
};

const playCheckAlreadyListen = (conv: DFConv) => {
  try {
    return conv.user.storage.mediaIdentifier[conv.data.currentPlayingMedia.identifier];
  } catch (e) {
    return -1;
  }
};

const playSetAlreadyListen = (conv: DFConv) => {
  return conv.user.storage.mediaIdentifier[conv.data.currentPlayingMedia.identifier] = conv.data.currentPlayingMedia.chapter;
};

const playGetMedia = async (conv: DFConv) => {
  const media = await getAudiobook(conv.data.titleTellByUser, conv.data.chapterToPlay);
  if (media.state === Eaudiobook.OK) {
    conv.data.currentPlayingMedia = media;
  } else {
    throw media.state.toString();
  }
};

export const play = async (conv: DFConv) => {
  if (conv.utils.isNotCompatible()) {
    return conv.utils.ask(prompts.not_compatible);
  }

  try {
    const { audiobook } = conv.parameters;
    if (audiobook && audiobook.toString() !== '') {
      conv.data.titleTellByUser = audiobook as string;
      conv.data.chapterToPlay = 0;
      await playGetMedia(conv);
      conv.data.chapterToPlay = playCheckAlreadyListen(conv);
      if (conv.data.chapterToPlay > 0) {
        return playAnswer(conv);
      }
      conv.data.chapterToPlay = 0;
    } else {
      await playGetMedia(conv);
    }
    playSetAlreadyListen(conv);
    playMedia(conv);
  } catch (e) {
    if (e === Eaudiobook.END_CHAPTER) {
      conv.utils.ask(prompts.play_finish);
    } else {
      conv.utils.ask(prompts.error, e);
    }
    conv.contexts.delete('play_audiobook-followup');
  }
};

export const playPrev = async (conv: DFConv) => {
  --conv.data.chapterToPlay;
  await play(conv);
};

export const playNext = async (conv: DFConv) => {
  ++conv.data.chapterToPlay;
  await play(conv);
};

export const playNo = async (conv: DFConv) => {
  conv.data.chapterToPlay = 0;
  await play(conv);
};
