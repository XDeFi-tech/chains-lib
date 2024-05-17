import {
  createDefaultAminoConverters,
  defaultRegistryTypes,
  Coin,
} from '@cosmjs/stargate';
import { AminoTypes } from '@cosmjs/stargate/build/aminotypes';
import { toUtf8 } from '@cosmjs/encoding';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';
import { Registry } from '@cosmjs/proto-signing';
import {
  osmosisProtoRegistry,
  osmosisAminoConverters,
} from 'osmojs/dist/codegen/osmosis/client';

/**
 * The Amino JSON representation of [MsgExecuteContract].
 *
 * [MsgExecuteContract]: https://github.com/CosmWasm/wasmd/blob/v0.18.0-rc1/proto/cosmwasm/wasm/v1/tx.proto#L73-L86
 */
export interface AminoMsgExecuteContract {
  type: 'wasm/MsgExecuteContract';
  value: {
    /** Bech32 account address */
    readonly sender: string;
    /** Bech32 account address */
    readonly contract: string;
    /** Execute message as JavaScript object */
    readonly msg: any;
    readonly funds: readonly Coin[];
  };
}

export const STARGATE_CLIENT_OPTIONS = {
  registry: new Registry([
    ...defaultRegistryTypes,
    ['/cosmwasm.wasm.v1.MsgExecuteContract', MsgExecuteContract],
  ]),
  aminoTypes: new AminoTypes({
    ...createDefaultAminoConverters(),
    '/cosmwasm.wasm.v1.MsgExecuteContract': {
      aminoType: 'wasm/MsgExecuteContract',
      toAmino: ({
        sender,
        contract,
        msg,
        funds,
      }: MsgExecuteContract): AminoMsgExecuteContract['value'] => ({
        sender: sender,
        contract: contract,
        msg: msg,
        funds: funds,
      }),
      fromAmino: ({
        sender,
        contract,
        msg,
        funds,
      }: AminoMsgExecuteContract['value']): MsgExecuteContract => ({
        sender: sender,
        contract: contract,
        msg: toUtf8(JSON.stringify(msg)),
        funds: [...funds],
      }),
    },
  }),
};
