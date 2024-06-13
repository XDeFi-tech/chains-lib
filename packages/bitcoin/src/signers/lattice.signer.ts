import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import {
  fetchAddresses,
  fetchBtcLegacyAddresses,
  setup,
  sign,
  signBtcLegacyTx,
} from 'gridplus-sdk';
import * as Bitcoin from 'bitcoinjs-lib';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LATTICE)
export class LatticeSigner extends Signer.Provider {
  private client!: string;
  public isPaired: boolean;

  constructor(client: string, isPaired: boolean) {
    super();
    this.client = client;
    this.isPaired = isPaired;
  }

  static async create({
    deviceId,
    password,
    name,
  }: {
    deviceId: string;
    password: string;
    name: string;
  }): Promise<LatticeSigner> {
    let clientData = '';

    const getStoredClient = () => clientData;
    const setStoredClient = (newClientData: string | null) => {
      clientData = newClientData ?? '';
    };

    const isPaired = await setup({
      deviceId,
      password,
      name,
      getStoredClient,
      setStoredClient,
    });

    return new LatticeSigner(clientData, isPaired);
  }

  verifyAddress(address: string): boolean {
    try {
      Bitcoin.address.toOutputScript(address);
      return true;
    } catch (err) {
      return false;
    }
  }

  async getAddress(derivation: string): Promise<string> {
    const addresses = await fetchAddresses({
      startPath: convertDerivationPathToArray(derivation),
      n: 1,
    });
    return addresses[0];
  }

  async sign(msg: ChainMsg, derivation: string) {
    const tx = await msg.buildTx();
    const payload = convertTransactionToBtcTxData(tx, derivation);
    const res = await signBtcLegacyTx(payload);
    msg.sign(res.txHash);
  }
}

export function convertDerivationPathToArray(path: string): number[] {
  // Validate input path
  if (!path.startsWith('m')) {
    throw new Error('Invalid derivation path. Must start with "m".');
  }

  // Split the path into components, skipping the first element ('m')
  const components = path.split('/').slice(1);

  // Convert each component to the corresponding number
  const result = components.map((component) => {
    // Check if the component is hardened (ends with a single quote)
    const isHardened = component.endsWith("'");

    // Parse the number, removing the single quote if it is hardened
    const number = parseInt(isHardened ? component.slice(0, -1) : component);

    // Add the hardened offset if necessary
    return isHardened ? HARDENED_OFFSET + number : number;
  });

  return result;
}

const HARDENED_OFFSET = 0x80000000; // Hardened offset
const BTC_PURPOSE_P2SH_P2WPKH = 49 + HARDENED_OFFSET; // Example constant for a specific purpose
const BTC_TESTNET_COIN = 1 + HARDENED_OFFSET; // Example constant for testnet

// Type definitions for transaction structures
interface Input {
  hash: string;
  index: number;
  value: number;
}

interface Output {
  address?: string;
  value: number;
}

interface Transaction {
  inputs: Input[];
  outputs: Output[];
  fee: string;
}

interface BtcTxData {
  prevOuts: {
    txHash: string;
    value: number;
    index: number;
    signerPath: number[];
  }[];
  recipient: string;
  value: number;
  fee: number;
  signerPath: number[];
  changePath: number[];
}

function convertTransactionToBtcTxData(
  transaction: Transaction,
  derivation: string
): BtcTxData {
  const signerPath = convertDerivationPathToArray(derivation);
  const prevOuts = transaction.inputs.map((input, index) => ({
    txHash: input.hash,
    value: input.value,
    index: input.index,
    signerPath: [
      signerPath[0],
      signerPath[1],
      signerPath[2],
      Math.floor(index / 5),
      index % 5,
    ],
  }));

  const recipientOutput = transaction.outputs.find(
    (output) => output.address !== undefined
  );
  const recipient = recipientOutput?.address || '';
  const value = recipientOutput?.value || 0;
  const feeSatoshis = parseFloat(transaction.fee) * 100000000; // Convert BTC to satoshis

  const changeOutput = transaction.outputs.find((output) => !output.address);
  const changePathIndex = transaction.outputs.indexOf(
    changeOutput || transaction.outputs[0]
  );

  return {
    signerPath,
    prevOuts,
    recipient,
    value,
    fee: Math.round(feeSatoshis),
    changePath: [
      BTC_PURPOSE_P2SH_P2WPKH,
      BTC_TESTNET_COIN,
      HARDENED_OFFSET,
      1,
      changePathIndex,
    ],
  };
}
export default LatticeSigner;
