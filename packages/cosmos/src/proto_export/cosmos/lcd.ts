//@ts-nocheck
import { LCDClient } from '@cosmology/lcd';
export const createLCDClient = async ({
  restEndpoint,
}: {
  restEndpoint: string;
}) => {
  const requestClient = new LCDClient({
    restEndpoint,
  });
  return {
    cosmos: {
      auth: {
        v1beta1: new (await import('./auth/v1beta1/query.lcd')).LCDQueryClient({
          requestClient,
        }),
      },
      bank: {
        v1beta1: new (await import('./bank/v1beta1/query.lcd')).LCDQueryClient({
          requestClient,
        }),
      },
      base: {
        node: {
          v1beta1: new (
            await import('./base/node/v1beta1/query.lcd')
          ).LCDQueryClient({
            requestClient,
          }),
        },
      },
    },
  };
};
