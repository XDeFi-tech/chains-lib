import { CryptoAssetArgs, GetCryptoAssetsDocument } from '../../graphql';
import { gqlClient } from '../gql.client';

export const getCryptoAssets = (input: Array<CryptoAssetArgs> | CryptoAssetArgs) => {
  return gqlClient.query({
    query: GetCryptoAssetsDocument,
    variables: {
      input: input,
    },
  });
};
