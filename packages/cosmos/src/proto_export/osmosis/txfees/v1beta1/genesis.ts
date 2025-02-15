//@ts-nocheck
import { BinaryReader, BinaryWriter } from '../../../binary';
import { GlobalDecoderRegistry } from '../../../registry';

import { FeeToken, FeeTokenAmino, FeeTokenSDKType } from './feetoken';
import { Params, ParamsAmino, ParamsSDKType } from './params';
/** GenesisState defines the txfees module's genesis state. */
export interface GenesisState {
  basedenom: string;
  feetokens: FeeToken[];
  /** params is the container of txfees parameters. */
  params: Params;
}
export interface GenesisStateProtoMsg {
  typeUrl: '/osmosis.txfees.v1beta1.GenesisState';
  value: Uint8Array;
}
/** GenesisState defines the txfees module's genesis state. */
export interface GenesisStateAmino {
  basedenom?: string;
  feetokens?: FeeTokenAmino[];
  /** params is the container of txfees parameters. */
  params?: ParamsAmino;
}
export interface GenesisStateAminoMsg {
  type: 'osmosis/txfees/genesis-state';
  value: GenesisStateAmino;
}
/** GenesisState defines the txfees module's genesis state. */
export interface GenesisStateSDKType {
  basedenom: string;
  feetokens: FeeTokenSDKType[];
  params: ParamsSDKType;
}
function createBaseGenesisState(): GenesisState {
  return {
    basedenom: '',
    feetokens: [],
    params: Params.fromPartial({}),
  };
}
export const GenesisState = {
  typeUrl: '/osmosis.txfees.v1beta1.GenesisState',
  aminoType: 'osmosis/txfees/genesis-state',
  is(o: any): o is GenesisState {
    return (
      o &&
      (o.$typeUrl === GenesisState.typeUrl ||
        (typeof o.basedenom === 'string' &&
          Array.isArray(o.feetokens) &&
          (!o.feetokens.length || FeeToken.is(o.feetokens[0])) &&
          Params.is(o.params)))
    );
  },
  isSDK(o: any): o is GenesisStateSDKType {
    return (
      o &&
      (o.$typeUrl === GenesisState.typeUrl ||
        (typeof o.basedenom === 'string' &&
          Array.isArray(o.feetokens) &&
          (!o.feetokens.length || FeeToken.isSDK(o.feetokens[0])) &&
          Params.isSDK(o.params)))
    );
  },
  isAmino(o: any): o is GenesisStateAmino {
    return (
      o &&
      (o.$typeUrl === GenesisState.typeUrl ||
        (typeof o.basedenom === 'string' &&
          Array.isArray(o.feetokens) &&
          (!o.feetokens.length || FeeToken.isAmino(o.feetokens[0])) &&
          Params.isAmino(o.params)))
    );
  },
  encode(
    message: GenesisState,
    writer: BinaryWriter = BinaryWriter.create()
  ): BinaryWriter {
    if (message.basedenom !== '') {
      writer.uint32(10).string(message.basedenom);
    }
    for (const v of message.feetokens) {
      FeeToken.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader =
      input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.basedenom = reader.string();
          break;
        case 2:
          message.feetokens.push(FeeToken.decode(reader, reader.uint32()));
          break;
        case 4:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.basedenom = object.basedenom ?? '';
    message.feetokens =
      object.feetokens?.map((e) => FeeToken.fromPartial(e)) || [];
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.basedenom !== undefined && object.basedenom !== null) {
      message.basedenom = object.basedenom;
    }
    message.feetokens =
      object.feetokens?.map((e) => FeeToken.fromAmino(e)) || [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.basedenom = message.basedenom === '' ? undefined : message.basedenom;
    if (message.feetokens) {
      obj.feetokens = message.feetokens.map((e) =>
        e ? FeeToken.toAmino(e) : undefined
      );
    } else {
      obj.feetokens = message.feetokens;
    }
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  toAminoMsg(message: GenesisState): GenesisStateAminoMsg {
    return {
      type: 'osmosis/txfees/genesis-state',
      value: GenesisState.toAmino(message),
    };
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: '/osmosis.txfees.v1beta1.GenesisState',
      value: GenesisState.encode(message).finish(),
    };
  },
};
GlobalDecoderRegistry.register(GenesisState.typeUrl, GenesisState);
GlobalDecoderRegistry.registerAminoProtoMapping(
  GenesisState.aminoType,
  GenesisState.typeUrl
);
