import { NumberIsh } from '@xdefi-tech/chains-core';
import * as UTXO from '@xdefi-tech/chains-utxo';

export interface MsgBody {
  amount: NumberIsh;
  to: string;
  memo?: string | Uint8Array;
  from: string;
  gasLimit?: NumberIsh; // ByteFee
  decimals?: number;
}

export class ChainMsg extends UTXO.ChainMsg {}
