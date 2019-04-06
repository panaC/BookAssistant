
import { pipe } from "./pipe";

function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 1000);
  });
}

const testtest = async () => {
  const fn1 = async (val: string) => {
    await sleep();
    return `fn1(${val})`
  };
  const fn2 = async (val: string) => {
    await sleep();
    return `fn2(${val})`;
  }
  const fn3 = async (val: string) => {
    await sleep();
    return `fn3(${val})`;
  }
  const pipeFunction = await pipe(fn1, fn2, fn3);
  console.log(await pipeFunction("inner"));
}

testtest()