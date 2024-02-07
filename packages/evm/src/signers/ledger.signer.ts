import App from '@ledgerhq/hw-app-eth';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import Transport from '@ledgerhq/hw-transport';
import { Signer, SignerDecorator } from '@xdefi-tech/chains-core';
import { utils } from 'ethers';

import { ChainMsg } from '../msg';

@SignerDecorator(Signer.SignerType.LEDGER)
export class LedgerSigner extends Signer.Provider {
  private transport: Transport | null;
  private isInternalTransport: boolean;

  constructor(transport?: Transport) {
    super();
    this.transport = null;

    if (transport) {
      this.transport = transport;
      this.isInternalTransport = false;
    } else {
      this.isInternalTransport = true;
      TransportWebHID.create().then((t) => {
        this.transport = t as Transport;
      });
    }
  }

  async initTransport() {
    this.transport = (await TransportWebHID.create()) as Transport;
    this.isInternalTransport = true;
  }

  verifyAddress(address: string): boolean {
    return utils.isAddress(address);
  }

  async getPrivateKey(_derivation: string) {
    throw new Error('Cannot extract private key from Ledger device');
  }

  async getAddress(derivation: string): Promise<string> {
    try {
      if (!this.transport) {
        await this.initTransport();
      }
      const app = new App(this.transport as Transport);
      const address = await app.getAddress(derivation);

      return address.address;
    } finally {
      if (this.isInternalTransport && this.transport) {
        this.transport.close();
        this.transport = null;
      }
    }
  }

  async sign(msg: ChainMsg, derivation: string): Promise<void> {
    try {
      if (!this.transport) {
        await this.initTransport();
      }
      const app = new App(this.transport as Transport);
      const txData = await msg.buildTx();
      const unsignedTx = {
        to: txData.to,
        from: txData.from,
        chainId: parseInt(txData.chainId),
        nonce: Number(txData.nonce),
        gasLimit: txData.gasLimit,
        value: txData.value,
        ...(txData.maxPriorityFeePerGas && {
          maxPriorityFeePerGas: txData.maxPriorityFeePerGas,
        }),
        ...(txData.maxFeePerGas && { maxFeePerGas: txData.maxFeePerGas }),
        ...(txData.gasPrice && { gasPrice: txData.gasPrice }),
        data: txData.data,
        type: txData.type,
      };

      const rawTx = utils
        .hexlify(Buffer.from(JSON.stringify(unsignedTx)))
        .slice(2);
      const signature = await app.signTransaction(derivation, rawTx);
      const signedTransaction = utils.hexlify(
        Buffer.from(JSON.stringify({ ...unsignedTx, ...signature }))
      );
      msg.sign('0x' + signedTransaction);
    } finally {
      if (this.isInternalTransport && this.transport) {
        this.transport.close();
        this.transport = null;
      }
    }
  }
}

export default LedgerSigner;
