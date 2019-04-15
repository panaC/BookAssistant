import * as Fuse from 'fuse.js';
 
export const fuse = (search: string) => (array: string[]) => new Fuse(array, {
  caseSensitive: true,
  shouldSort: true,
  tokenize: true,
  findAllMatches: true,
  includeScore: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
}).search(search).reduce((pv, cv, idx) => {
  if (idx < 5) {
    try {
      // because the defenition file in fuse.js is foul
      // I have to disable the next line, to 'any' protection
      // fix this in the future
      //
      // I tried to force @types in src, but nothing help
      // the actual fuse.d.ts doesn't allow to import fuse
      // how the builder in fuse.js works ?
      // in fuse index.ts it export only one class : Fuse
      // but the importation didn't work
      // morover, and it's for this reason, the definition file is wrong
      // in simple text array through Fuse -> FuseResult is false
      // tslint:disable-next-line
      const t: any = cv.item; //:number
      pv.unshift(array[t]);
    } catch (e) {

    }
  }
  return pv;
}, [] as string[]);