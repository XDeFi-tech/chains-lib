// { interval: 2000, tries: 15 } => 15 * 2000 = 30000ms = 30s + request time
export interface WaitForOptions {
  interval: number;
  tries: number;
}

export const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const waitFor = async (callback: () => unknown, options: WaitForOptions = { interval: 2000, tries: 15 }) => {
  let tries = 0;
  let result = await callback();
  do {
    if (result) {
      return result;
    }
    await sleep(options.interval);
    result = await callback();
    tries++;
  } while (result || tries < options.tries);

  throw new Error('Timeout');
};
