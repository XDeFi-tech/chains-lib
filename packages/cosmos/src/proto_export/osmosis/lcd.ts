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
    osmosis: {
      lockup: new (await import('./lockup/query.lcd')).LCDQueryClient({
        requestClient,
      }),
      poolmanager: {
        v2: new (await import('./poolmanager/v2/query.lcd')).LCDQueryClient({
          requestClient,
        }),
      },
      protorev: {
        v1beta1: new (
          await import('./protorev/v1beta1/query.lcd')
        ).LCDQueryClient({
          requestClient,
        }),
      },
      smartaccount: {
        v1beta1: new (
          await import('./smartaccount/v1beta1/query.lcd')
        ).LCDQueryClient({
          requestClient,
        }),
      },
      tokenfactory: {
        v1beta1: new (
          await import('./tokenfactory/v1beta1/query.lcd')
        ).LCDQueryClient({
          requestClient,
        }),
      },
      txfees: {
        v1beta1: new (
          await import('./txfees/v1beta1/query.lcd')
        ).LCDQueryClient({
          requestClient,
        }),
      },
      valsetpref: {
        v1beta1: new (
          await import('./valsetpref/v1beta1/query.lcd')
        ).LCDQueryClient({
          requestClient,
        }),
      },
    },
  };
};
