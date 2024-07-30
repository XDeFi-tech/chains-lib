//@ts-nocheck
import { GeneratedType, Registry, OfflineSigner } from '@cosmjs/proto-signing';
import { AminoTypes, SigningStargateClient } from '@cosmjs/stargate';
import { HttpEndpoint } from '@cosmjs/tendermint-rpc';

import * as cosmosAuthV1beta1TxRegistry from './auth/v1beta1/tx.registry';
import * as cosmosBankV1beta1TxRegistry from './bank/v1beta1/tx.registry';
import * as cosmosUpgradeV1beta1TxRegistry from './upgrade/v1beta1/tx.registry';
import * as cosmosAuthV1beta1TxAmino from './auth/v1beta1/tx.amino';
import * as cosmosBankV1beta1TxAmino from './bank/v1beta1/tx.amino';
import * as cosmosUpgradeV1beta1TxAmino from './upgrade/v1beta1/tx.amino';
export const cosmosAminoConverters = {
  ...cosmosAuthV1beta1TxAmino.AminoConverter,
  ...cosmosBankV1beta1TxAmino.AminoConverter,
  ...cosmosUpgradeV1beta1TxAmino.AminoConverter,
};
export const cosmosProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [
  ...cosmosAuthV1beta1TxRegistry.registry,
  ...cosmosBankV1beta1TxRegistry.registry,
  ...cosmosUpgradeV1beta1TxRegistry.registry,
];
export const getSigningCosmosClientOptions = (): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...cosmosProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...cosmosAminoConverters,
  });
  return {
    registry,
    aminoTypes,
  };
};
export const getSigningCosmosClient = async ({
  rpcEndpoint,
  signer,
}: {
  rpcEndpoint: string | HttpEndpoint;
  signer: OfflineSigner;
}) => {
  const { registry, aminoTypes } = getSigningCosmosClientOptions();
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
