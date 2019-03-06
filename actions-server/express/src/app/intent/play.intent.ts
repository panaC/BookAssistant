import { getMedia, Eaudiobook, getMediaReference } from './../service/audiobook.service';
import { DFConv } from './../app';
import { prompts, translate } from './../prompt';

// play intent with output play_audiobook-follow

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
  const media = await getMedia(conv.data.titleTellByUser, conv.data.chapterToPlay);
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
    conv.utils.ask(prompts.error, translate(e) || e);
    conv.contexts.delete('play_audiobook-followup');
  }
};

// play_audiobook-follow

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

// PlayReference with play_audiobook-follow

const playGetMediaReference = async (conv: DFConv, reference: string) => {
  const media = await getMediaReference(conv.data.titleTellByUser, reference);
  if (media.state === Eaudiobook.OK) {
    conv.data.currentPlayingMedia = media;
  } else {
    throw media.state.toString();
  }
};

export const playReference = async (conv: DFConv) => {
  if (conv.utils.isNotCompatible()) {
    return conv.utils.ask(prompts.not_compatible);
  }

  try {
    const { reference } = conv.parameters;
    if (reference && reference.toString() !== '') {
      await playGetMediaReference(conv, reference as string); 
      conv.data.chapterToPlay = conv.data.currentPlayingMedia.chapter;
      await playMedia(conv);
    } else {
      conv.utils.ask(prompts.play_refEmpty)
    }
  } catch (e) {
    conv.utils.ask(prompts.error, translate(e) || e);
    // conv.contexts.delete('play_audiobook-followup');
  }
}