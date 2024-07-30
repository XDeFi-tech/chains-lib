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
    cosmos: {
      auth: {
        v1beta1: (
          await import('./auth/v1beta1/query.rpc.Query')
        ).createRpcQueryExtension(client),
      },
      bank: {
        v1beta1: (
          await import('./bank/v1beta1/query.rpc.Query')
        ).createRpcQueryExtension(client),
      },
      base: {
        node: {
          v1beta1: (
            await import('./base/node/v1beta1/query.rpc.Service')
          ).createRpcQueryExtension(client),
        },
      },
      upgrade: {
        v1beta1: (
          await import('./upgrade/v1beta1/query.rpc.Query')
        ).createRpcQueryExtension(client),
      },
    },
  };
};
