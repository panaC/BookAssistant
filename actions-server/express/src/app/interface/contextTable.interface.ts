
//
// saved all context used in app here
// in Dialogflow pick a incomming context only if it appears in it.
// See actions-on-google Modules -> Dialogflow/context.ts
export interface IcontextTable /*extends Contexts*/ {
  start: number;
  listen: number;
  choice: number;
  yesno: number;
  play: number;
}