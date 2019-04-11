
export const compose = async <R>(fn1: (a: R) => Promise<R>, ...fns: Array<(a: R) => Promise<R>>) =>
  fns.reduce((prevFn, nextFn) => async (value) => prevFn(await nextFn(value)), await fn1);