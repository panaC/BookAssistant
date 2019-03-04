import { noInput, goodbye } from './default.intent';
import { welcome } from './welcome.intent';
import { play, playPrev } from './play.intent';

/*
interface Iintent {
  [intent: string]: (conv: DFConv) => void;
}
*/

export const intent = {
  welcome,
  play,
  playPrev,
  noInput,
  goodbye,
};
