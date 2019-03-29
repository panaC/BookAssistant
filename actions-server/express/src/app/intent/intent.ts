import { DFConv } from './../app';
import { currentChapter, numberOfChapter, author } from './playInfo.intent';
import { noInput, goodbye } from './default.intent';
import { welcome } from './welcome.intent';
import { play, playPrev, playNext, playNo, playReference } from './play.intent';

const main = async (conv: DFConv) => {
  conv.mae.mae();
  await conv.session.save();
}

export const intent = {
  main,
  welcome,
  play,
  playPrev,
  playNext,
  playNo,
  playReference,
  currentChapter,
  numberOfChapter,
  author,
  noInput,
  goodbye,
};

export const intentNamePlayAudiobookIndex = 1;

export const intentName = [
  'Default Welcome Intent',
  'play_audiobook',
  'play_audiobook-media_status',
  'play_audiobook-repeat',
  'play_audiobook-next',
  'play_audiobook-previous',
  'play_audiobook-yes',
  'play_audiobook-no',
  'play_audiobook-reference',
  'play_audiobook-numberOfChapter',
  'play_audiobook-chapter',
  'play_audiobook-author',
  'no_input',
  'goodbye',
]
