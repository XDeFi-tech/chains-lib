//@ts-nocheck
import { GeneratedType, Registry, OfflineSigner } from '@cosmjs/proto-signing';
import {
  defaultRegistryTypes,
  AminoTypes,
  SigningStargateClient,
} from '@cosmjs/stargate';
import { HttpEndpoint } from '@cosmjs/tendermint-rpc';

import * as osmosisConcentratedliquidityPoolmodelConcentratedV1beta1TxRegistry from './concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry';
import * as osmosisConcentratedliquidityV1beta1TxRegistry from './concentratedliquidity/v1beta1/tx.registry';
import * as osmosisGammPoolmodelsBalancerV1beta1TxRegistry from './gamm/poolmodels/balancer/v1beta1/tx.registry';
import * as osmosisGammPoolmodelsStableswapV1beta1TxRegistry from './gamm/poolmodels/stableswap/v1beta1/tx.registry';
import * as osmosisGammV1beta1TxRegistry from './gamm/v1beta1/tx.registry';
import * as osmosisIbchooksTxRegistry from './ibchooks/tx.registry';
import * as osmosisIncentivesTxRegistry from './incentives/tx.registry';
import * as osmosisLockupTxRegistry from './lockup/tx.registry';
import * as osmosisPoolmanagerV1beta1TxRegistry from './poolmanager/v1beta1/tx.registry';
import * as osmosisProtorevV1beta1TxRegistry from './protorev/v1beta1/tx.registry';
import * as osmosisSmartaccountV1beta1TxRegistry from './smartaccount/v1beta1/tx.registry';
import * as osmosisSuperfluidTxRegistry from './superfluid/tx.registry';
import * as osmosisTokenfactoryV1beta1TxRegistry from './tokenfactory/v1beta1/tx.registry';
import * as osmosisTxfeesV1beta1TxRegistry from './txfees/v1beta1/tx.registry';
import * as osmosisValsetprefV1beta1TxRegistry from './valsetpref/v1beta1/tx.registry';
import * as osmosisConcentratedliquidityPoolmodelConcentratedV1beta1TxAmino from './concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino';
import * as osmosisConcentratedliquidityV1beta1TxAmino from './concentratedliquidity/v1beta1/tx.amino';
import * as osmosisGammPoolmodelsBalancerV1beta1TxAmino from './gamm/poolmodels/balancer/v1beta1/tx.amino';
import * as osmosisGammPoolmodelsStableswapV1beta1TxAmino from './gamm/poolmodels/stableswap/v1beta1/tx.amino';
import * as osmosisGammV1beta1TxAmino from './gamm/v1beta1/tx.amino';
import * as osmosisIbchooksTxAmino from './ibchooks/tx.amino';
import * as osmosisIncentivesTxAmino from './incentives/tx.amino';
import * as osmosisLockupTxAmino from './lockup/tx.amino';
import * as osmosisPoolmanagerV1beta1TxAmino from './poolmanager/v1beta1/tx.amino';
import * as osmosisProtorevV1beta1TxAmino from './protorev/v1beta1/tx.amino';
import * as osmosisSmartaccountV1beta1TxAmino from './smartaccount/v1beta1/tx.amino';
import * as osmosisSuperfluidTxAmino from './superfluid/tx.amino';
import * as osmosisTokenfactoryV1beta1TxAmino from './tokenfactory/v1beta1/tx.amino';
import * as osmosisTxfeesV1beta1TxAmino from './txfees/v1beta1/tx.amino';
import * as osmosisValsetprefV1beta1TxAmino from './valsetpref/v1beta1/tx.amino';
export const osmosisAminoConverters = {
  ...osmosisConcentratedliquidityPoolmodelConcentratedV1beta1TxAmino.AminoConverter,
  ...osmosisConcentratedliquidityV1beta1TxAmino.AminoConverter,
  ...osmosisGammPoolmodelsBalancerV1beta1TxAmino.AminoConverter,
  ...osmosisGammPoolmodelsStableswapV1beta1TxAmino.AminoConverter,
  ...osmosisGammV1beta1TxAmino.AminoConverter,
  ...osmosisIbchooksTxAmino.AminoConverter,
  ...osmosisIncentivesTxAmino.AminoConverter,
  ...osmosisLockupTxAmino.AminoConverter,
  ...osmosisPoolmanagerV1beta1TxAmino.AminoConverter,
  ...osmosisProtorevV1beta1TxAmino.AminoConverter,
  ...osmosisSmartaccountV1beta1TxAmino.AminoConverter,
  ...osmosisSuperfluidTxAmino.AminoConverter,
  ...osmosisTokenfactoryV1beta1TxAmino.AminoConverter,
  ...osmosisTxfeesV1beta1TxAmino.AminoConverter,
  ...osmosisValsetprefV1beta1TxAmino.AminoConverter,
};
export const osmosisProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [
  ...osmosisConcentratedliquidityPoolmodelConcentratedV1beta1TxRegistry.registry,
  ...osmosisConcentratedliquidityV1beta1TxRegistry.registry,
  ...osmosisGammPoolmodelsBalancerV1beta1TxRegistry.registry,
  ...osmosisGammPoolmodelsStableswapV1beta1TxRegistry.registry,
  ...osmosisGammV1beta1TxRegistry.registry,
  ...osmosisIbchooksTxRegistry.registry,
  ...osmosisIncentivesTxRegistry.registry,
  ...osmosisLockupTxRegistry.registry,
  ...osmosisPoolmanagerV1beta1TxRegistry.registry,
  ...osmosisProtorevV1beta1TxRegistry.registry,
  ...osmosisSmartaccountV1beta1TxRegistry.registry,
  ...osmosisSuperfluidTxRegistry.registry,
  ...osmosisTokenfactoryV1beta1TxRegistry.registry,
  ...osmosisTxfeesV1beta1TxRegistry.registry,
  ...osmosisValsetprefV1beta1TxRegistry.registry,
];
export const getSigningOsmosisClientOptions = ({
  defaultTypes = defaultRegistryTypes,
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...osmosisProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...osmosisAminoConverters,
  });
  return {
    registry,
    aminoTypes,
  };
};
export const getSigningOsmosisClient = async ({
  rpcEndpoint,
  signer,
  defaultTypes = defaultRegistryTypes,
}: {
  rpcEndpoint: string | HttpEndpoint;
  signer: OfflineSigner;
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
}) => {
  const { registry, aminoTypes } = getSigningOsmosisClientOptions({
    defaultTypes,
  });
  const client = await SigningStargateClient.connectWithSigner(
    rpcEndpoint,
    signer,
    {
      registry: registry as any,
      aminoTypes,
    }
  );
  return client;
};
