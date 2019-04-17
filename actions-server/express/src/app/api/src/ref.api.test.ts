import { getRefWithTimecode } from './ref.api';
import { Ilinks } from './../interface/links.interface';

it('test get a ref with timecode in href', () => {
  const data = '[{"href":"https://edrlab.ml/audiobook/mark-twain_tom-sawyer/TSawyer_01-02_twain_64kb.mp3#t=60","title":"partie 1","children":[{"href":"https://edrlab.ml/audiobook/mark-twain_tom-sawyer/TSawyer_01-02_twain_64kb.mp3#t=500","title":"une citation","children":[{"href":"https://edrlab.ml/audiobook/mark-twain_tom-sawyer/TSawyer_01-02_twain_64kb.mp3#t=2000","title":"une citation plus intéressante","children":[]}]}]},{"href":"https://edrlab.ml/audiobook/mark-twain_tom-sawyer/TSawyer_03-04_twain_64kb.mp3#t=13","title":"chapitre 3","children":[{"href":"https://edrlab.ml/audiobook/mark-twain_tom-sawyer/TSawyer_03-04_twain_64kb.mp3#t=783","title":"chapitre 4","children":[]}]}]';
  const toc: Ilinks[] = JSON.parse(data);

  const ref = getRefWithTimecode(toc, 'https://edrlab.ml/audiobook/mark-twain_tom-sawyer/TSawyer_03-04_twain_64kb.mp3', 15);
  expect(ref).toEqual('chapitre 3');
});