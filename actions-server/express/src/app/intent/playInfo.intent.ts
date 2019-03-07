import { DFConv } from './../app';
import { prompts } from '../prompt';

export const numberOfChapter = (conv: DFConv) => {
  conv.utils.ask(prompts.play_numberOfChapter
    , conv.data.currentPlayingMedia.numberOfChapter);
};

export const currentChapter = (conv: DFConv) => {
  conv.utils.ask(prompts.play_chapter
    , conv.data.currentPlayingMedia.chapter);
}

export const author = (conv: DFConv) => {
  conv.utils.ask(prompts.play_author
    , conv.data.currentPlayingMedia.author);
}