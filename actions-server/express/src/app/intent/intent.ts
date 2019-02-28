import { DFConv } from './../app';
import { welcomeIntent} from './welcome.intent';

/*
interface Iintent {
  [intent: string]: (conv: DFConv) => void;
}
*/

export const intent = {
  welcome: welcomeIntent,
};
