import { gqlClient } from '@xdefi-tech/chains-core';
import { CryptoAssetArgs, GetCryptoAssetsDocument } from '../graphql';

export const getCryptoAssets = (
  input: Array<CryptoAssetArgs> | CryptoAssetArgs
) => {
  return gqlClient.query({
    query: GetCryptoAssetsDocument,
    variables: {
      input: input,
    },
    fetchPolicy: 'no-cache',
  });
};
