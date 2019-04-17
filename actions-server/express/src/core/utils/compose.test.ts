import {compose} from './compose';

it('compose function', async () => {
  function sleep() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
  }

  const testtest = async () => {
    const fn1 = async (val: string) => {
      await sleep();
      return `fn1(${val})`;
    };
    const fn2 = async (val: string) => {
      await sleep();
      return `fn2(${val})`;
    };
    const fn3 = async (val: string) => {
      await sleep();
      return `fn3(${val})`;
    };
    const composedFunction = await compose(fn1, fn2, fn3);
    return await composedFunction('inner');
  };

  expect(await testtest()).toEqual('fn1(fn2(fn3(inner)))');
});