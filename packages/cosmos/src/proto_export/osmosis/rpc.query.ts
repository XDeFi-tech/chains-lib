//@ts-nocheck
import { connectComet, HttpEndpoint } from '@cosmjs/tendermint-rpc';
import { QueryClient } from '@cosmjs/stargate';
export const createRPCQueryClient = async ({
  rpcEndpoint,
}: {
  rpcEndpoint: string | HttpEndpoint;
}) => {
  const tmClient = await connectComet(rpcEndpoint);
  const client = new QueryClient(tmClient);
  return {
    osmosis: {
      lockup: (
        await import('./lockup/query.rpc.Query')
      ).createRpcQueryExtension(client),
      poolmanager: {
        v2: (
          await import('./poolmanager/v2/query.rpc.Query')
        ).createRpcQueryExtension(client),
      },
      protorev: {
        v1beta1: (
          await import('./protorev/v1beta1/query.rpc.Query')
        ).createRpcQueryExtension(client),
      },
      smartaccount: {
        v1beta1: (
          await import('./smartaccount/v1beta1/query.rpc.Query')
        ).createRpcQueryExtension(client),
      },
      txfees: {
        v1beta1: (
          await import('./txfees/v1beta1/query.rpc.Query')
        ).createRpcQueryExtension(client),
      },
      valsetpref: {
        v1beta1: (
          await import('./valsetpref/v1beta1/query.rpc.Query')
        ).createRpcQueryExtension(client),
      },
    },
  };
};
