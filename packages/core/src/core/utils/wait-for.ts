// { interval: 2000, tries: 15 } => 15 * 2000 = 30000ms = 30s + request time
export interface WaitForOptions {
  interval: number;
  tries: number;
}

export const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const waitFor = async <T>(
  callback: () => T,
  options: WaitForOptions = { interval: 2000, tries: 15 }
): Promise<T> => {
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
