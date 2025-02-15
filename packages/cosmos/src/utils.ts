import {
  createDefaultAminoConverters,
  defaultRegistryTypes,
} from '@cosmjs/stargate/build/signingstargateclient';
import { AminoTypes } from '@cosmjs/stargate/build/aminotypes';
import { Registry } from '@cosmjs/proto-signing/build/registry';
import axios from 'axios';
import { wasmTypes } from '@cosmjs/cosmwasm-stargate/build/modules/wasm/messages';
import { createWasmAminoConverters } from '@cosmjs/cosmwasm-stargate/build/modules/wasm/aminomessages';
import { MsgData } from '@xdefi-tech/chains-core';

import {
  osmosisProtoRegistry,
  osmosisAminoConverters,
} from './proto_export/osmosis/client';
import { COSMOS_MANIFESTS, CosmosHubChains } from './manifests';
import { MsgBody } from './msg';
import { IBCPayload } from './chain.provider';

export interface ChainAsset {
  denom: string;
  chain_id: string;
  origin_denom: string;
  origin_chain_id: string;
  trace: string;
  is_cw20: boolean;
  is_evm: boolean;
  is_svm: boolean;
  symbol: string;
  name: string;
  logo_uri: string;
  decimals: number;
  description: string;
  recommended_symbol: string;
}

export interface TransferData {
  port: string;
  channel: string;
  from_chain_id: string;
  to_chain_id: string;
  pfm_enabled: boolean;
  supports_memo: boolean;
  denom_in: string;
  denom_out: string;
  bridge_id: string;
  smart_relay: boolean;
  chain_id: string;
  dest_denom: string;
}

export interface OperationData {
  transfer: TransferData;
  tx_index: number;
  amount_in: string;
  amount_out: string;
}

export interface RouteData {
  source_asset_denom: string;
  source_asset_chain_id: string;
  dest_asset_denom: string;
  dest_asset_chain_id: string;
  amount_in: string;
  amount_out: string;
  operations: OperationData[];
  chain_ids: string[];
  does_swap: boolean;
  estimated_amount_out: string;
  swap_venues: any[];
  txs_required: number;
  usd_amount_in: string;
  usd_amount_out: string;
  estimated_fees: any[];
  required_chain_addresses: string[];
}

export interface RecommendAsset {
  destAssetDenom: string;
  chainId: string;
  decimals: string;
  originDenom: string;
  originalChainId: string;
}

export const STARGATE_CLIENT_OPTIONS = {
  registry: new Registry([
    ...defaultRegistryTypes,
    ...osmosisProtoRegistry,
    ...wasmTypes,
  ]),
  aminoTypes: new AminoTypes({
    ...createDefaultAminoConverters(),
    ...osmosisAminoConverters,
    ...createWasmAminoConverters(),
  }),
};

export const skipAxiosClient = axios.create({
  baseURL: 'https://api.skip.money',
});

export const getIBCTokenInfo = async (
  sourceChain: CosmosHubChains,
  originDenom: string,
  originalChain: CosmosHubChains
): Promise<null | ChainAsset> => {
  const sourceChainId = COSMOS_MANIFESTS[sourceChain].chainId;
  const originalChainId = COSMOS_MANIFESTS[originalChain].chainId;
  const {
    data: {
      chain_to_assets_map: {
        [sourceChainId]: { assets },
      },
    },
  } = await skipAxiosClient.get(
    `/v1/fungible/assets?chain_id=${sourceChainId}&include_no_metadata_assets=true&include_cw20_assets=false&include_evm_assets=false&include_svm_assets=true`
  );
  return (assets as any[]).find(
    (asset) =>
      asset.origin_denom === originDenom &&
      asset.origin_chain_id === originalChainId
  );
};

/**
 * Retrieves the IBC transfer route from the source asset to the destination asset.
 *
 * @param amountIn - The input amount, which must be an integer.
 * @param sourceAssetDenom - The denomination of the source asset.
 * @param sourceAssetChain - The chain of the source asset.
 * @param destAssetDenom - The denomination of the destination asset.
 * @param destAssetChain - The chain of the destination asset.
 * @returns The IBC transfer route.
 */
export const getIBCTransferRouter = async (
  amountIn: string,
  sourceAssetDenom: string,
  sourceAssetChain: CosmosHubChains,
  destAssetDenom: string,
  destAssetChain: CosmosHubChains
): Promise<RouteData> => {
  try {
    const { data } = await skipAxiosClient.post('/v2/fungible/route', {
      amountIn,
      sourceAssetDenom,
      sourceAssetChainId: COSMOS_MANIFESTS[sourceAssetChain].chainId,
      destAssetDenom,
      destAssetChainId: COSMOS_MANIFESTS[destAssetChain].chainId,
      allowMultiTx: true,
    });
    return data;
  } catch (error) {
    throw new Error('Route not found');
  }
};

export const createIBCTransferMsg = async (
  route: RouteData,
  userAddresses: Record<CosmosHubChains, string>
): Promise<MsgBody[]> => {
  const {
    source_asset_denom,
    source_asset_chain_id,
    dest_asset_denom,
    dest_asset_chain_id,
    amount_in,
    amount_out,
    operations,
  } = route;
  const addressList = route.chain_ids.reduce(
    (arr: string[], chainId: string): string[] => {
      for (const chain in COSMOS_MANIFESTS) {
        if (COSMOS_MANIFESTS[chain as CosmosHubChains]?.chainId === chainId) {
          const address = userAddresses[chain as CosmosHubChains];
          if (address) arr.push(address);
          return arr;
        }
      }
      throw new Error(`No manifest found for ${chainId}`);
    },
    []
  );
  const bodyTx = {
    source_asset_denom,
    source_asset_chain_id,
    dest_asset_denom,
    dest_asset_chain_id,
    amount_in,
    amount_out,
    operations,
    address_list: addressList,
  };
  const { data } = await skipAxiosClient.post('v2/fungible/msgs', bodyTx);
  return data.msgs.map(({ multi_chain_msg: { msg, msg_type_url } }: any) => {
    const msgConvert = JSON.parse(msg);
    const message: MsgBody = {
      from: msgConvert.sender,
      to: msgConvert.receiver,
      amount: '0',
      typeUrl: msg_type_url,
      msgs: [
        {
          typeUrl: msg_type_url,
          value: {
            sourcePort: msgConvert.source_port,
            sourceChannel: msgConvert.source_channel,
            sender: msgConvert.sender,
            token: {
              denom: msgConvert.token.denom,
              amount: msgConvert.token.amount,
            },
            receiver: msgConvert.receiver,
            timeoutHeight: msgConvert.timeout_height
              ? {
                  revisionNumber:
                    msgConvert.timeout_height.revision_number ?? 0,
                  revisionHeight:
                    msgConvert.timeout_height.revision_height ?? 0,
                }
              : undefined,
            timeoutTimestamp: msgConvert.timeout_timestamp,
            memo: msgConvert.memo,
          },
        },
      ],
    };
    return message;
  });
};

export const getIBCDestAsset = async (
  sourceChain: CosmosHubChains,
  destChain: CosmosHubChains,
  denom: string
): Promise<RecommendAsset> => {
  const {
    data: {
      recommendation_entries: [
        {
          recommendations: [
            {
              asset: {
                denom: destAssetDenom,
                decimals,
                chainId: chainId,
                origin_denom: originDenom,
                originalChainId,
              },
            },
          ],
        },
      ],
    },
  } = await skipAxiosClient.post('/v1/fungible/recommend_assets', {
    requests: [
      {
        source_asset_chain_id: COSMOS_MANIFESTS[sourceChain].chainId,
        dest_chain_id: COSMOS_MANIFESTS[destChain].chainId,
        source_asset_denom: denom,
      },
    ],
  });
  return {
    destAssetDenom,
    chainId,
    decimals,
    originDenom,
    originalChainId,
  };
};

export const isIBCPayload = (payload: MsgData): payload is IBCPayload => {
  return (
    payload.amountIn &&
    payload.sourceAssetDenom &&
    payload.sourceAssetChain &&
    payload.destAssetChain &&
    payload.addresses
  );
};

// this is required as routing is sometimes returning a denom which is in uppercase which is causing the balance not to be found
export const sanitiseMsg = (msg: any) => {
  if (Array.isArray(msg.amount)) {
    msg.amount = msg.amount.map((amount: { amount: string; denom: string }) => {
      if (amount.denom && !amount.denom.includes('ibc'))
        amount.denom = amount.denom.toLowerCase();
      return amount;
    });
  }
  if (msg?.tokenIn?.denom && !msg.tokenIn.denom.includes('ibc')) {
    msg.tokenIn.denom = msg.tokenIn.denom.toLowerCase();
  }
  return msg;
};
