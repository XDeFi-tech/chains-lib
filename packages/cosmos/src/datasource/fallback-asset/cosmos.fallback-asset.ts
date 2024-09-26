import { CryptoAssetArgs } from '../../gql/graphql';
import { skipAxiosClient } from '../../utils';

export const getFallbackAsset = async (
  chainId: string,
  cryptoAssets: CryptoAssetArgs[],
  nativeDenom: string
) => {
  try {
    const { data } = await skipAxiosClient.get(
      `/v1/fungible/assets?chain_id=${chainId}&include_no_metadata_assets=true&include_cw20_assets=false&include_evm_assets=false&include_svm_assets=false`
    );
    const assets = data.chain_to_assets_map[chainId].assets;
    return cryptoAssets.map(({ contract }) => {
      const denom = contract || nativeDenom;
      const asset = assets.find((e: any) => e.denom === denom);
      if (!asset) {
        return {
          id: denom,
          chainId: chainId,
          contract: denom,
        };
      }
      return {
        id: asset.denom,
        chainId: chainId,
        name: asset.name,
        symbol: asset.symbol,
        image: asset.logo_uri,
        decimals: asset.decimals,
        contract: asset.denom,
      };
    });
  } catch (error) {
    throw new Error('Failed to fetch fallback asset');
  }
};
