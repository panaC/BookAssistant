import { currentChapter, numberOfChapter, author } from './playInfo.intent';
import { noInput, goodbye } from './default.intent';
import { welcome } from './welcome.intent';
import { play, playPrev, playNext, playNo, playReference } from './play.intent';

/*
interface Iintent {
  [intent: string]: (conv: DFConv) => void;
}
*/

export const intent = {
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
