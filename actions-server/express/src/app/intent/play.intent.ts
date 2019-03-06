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
    conv.utils.ask(prompts.error, e);
  }
};

/*
export const play = async (conv: DFConv) => {
  if (conv.utils.isNotCompatible()) {
    return conv.utils.ask(prompts.not_compatible);
  }
  const mediaStorage = plainToClass(Map, conv.user.storage.mediaIdentifier);
  console.log(mediaStorage);

  const { audiobook } = conv.parameters;
  if (audiobook && audiobook.toString() !== '') {
    conv.data.currentName = audiobook as string;
    conv.data.currentChapter = 0;
  } else if (!conv.data.currentIdentifier ||
    conv.data.currentChapter >= conv.data.media.numberOfChapter ||
    conv.data.currentChapter < 0) {
    conv.data.currentChapter = 0;
  }

  try {
    const media = await getAudiobook(conv.data.currentName, conv.data.currentChapter);
    if (media.state === Eaudiobook.OK) {
      if (mediaStorage.has(media.identifier) &&
        (conv.data.currentIdentifier !== media.identifier)) {
        const previousChapter = mediaStorage.get(media.identifier) as number;
        conv.data.currentChapter = previousChapter;
        conv.contexts.set('play_audiobook-yes_no', 3);
        return conv.utils.ask(prompts.play_already_listen
          , conv.data.currentName
          , previousChapter.toString());
      }
      mediaStorage.set(media.identifier, media.chapter);
      conv.user.storage.mediaIdentifier = mediaStorage;
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
*/

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
