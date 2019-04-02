import { DFConv } from '../app';
import { currentChapter, numberOfChapter, author } from './playInfo.intent';
import { noInput, goodbye } from './default.intent';
import { welcome } from './welcome.intent';
import { play, playPrev, playNext, playNo, playReference } from './play.intent';

/*const main = async (conv: DFConv) => {
  conv.mae.mae();
  await conv.session.save();
}*/

/*
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
*/

export const intentName = [
  'start',
  'start.age',
  'start.name',
  'fallback',
  'no_input',
  'cancel'
]
