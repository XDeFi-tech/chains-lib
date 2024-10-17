import { MsgEncoding, GasFeeSpeed } from '@xdefi-tech/chains-core';
import utils from 'coinselect/utils';
import BigNumber from 'bignumber.js';

import { ChainMsg } from './msg';

describe('msg', () => {
  let mockProvider: any;

  beforeEach(() => {
    mockProvider = {
      getBalance: jest.fn(() =>
        Promise.resolve({
          getData: jest.fn(() =>
            Promise.resolve([
              {
                asset: {
                  chainId: 'dogecoin',
                  name: 'Dogecoin',
                  symbol: 'DOGE',
                  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/dogecoin/info/logo.png',
                  native: true,
                  id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                  price: '443.21',
                  decimals: 8,
                },
                amount: '1000',
              },
            ])
          ),
        })
      ),
      scanUTXOs: jest.fn(() =>
        Promise.resolve([
          {
            hash: '6a252623ba5fac4bec27c30b14caa97e3ccd0fe184c218e27d133fc29c353822',
            index: 0,
            value: 100000,
            txHex:
              '0200000001e08b69b1bad1c815f7acd8a0b52a0824bf566cc41864965bf2447077a7e67c4a010000006a47304402205f077c631fdd260436c60407d41abfe2767801ae42f59a0fb15c4cd9fec8b4d502203d9b58fe309cc682d31bdd9a78e1d86abd2e2997d2f7920ae9e8b22de029eb07012103c56bbe708bb2d10e04da017eea3c3915a115739c8273227a9dbb144dd3968594ffffffff02a0860100000000001976a91487bd785d0ef663988f9459fe789cdddeb44f01e188ac58e1d35a060000001976a91491a4cef5dd6d25194d6bdd7b9170c312aeead6eb88ac00000000',
            witnessUtxo: {
              value: 100000,
              script: Buffer.from(
                '76a91487bd785d0ef663988f9459fe789cdddeb44f01e188ac',
                'hex'
              ),
            },
          },
          {
            hash: '4a7ce6a7777044f25b966418c46c56bf24082ab5a0d8acf715c8d1bab1698be0',
            index: 0,
            value: 100000,
            txHex:
              '0200000001555c40b6c61f1af998681b1e284114fc6ebd908522265b2774df80dc37d3579f010000006a47304402204effd7e0f581419e1f01606168152de2c576b9b6583a0fab149e10f4886c39a302203f4ce7621acd9372b2c6dd1d56cd74b77e97640c836edbb2cbae4d13da4a4915012103c56bbe708bb2d10e04da017eea3c3915a115739c8273227a9dbb144dd3968594ffffffff02a0860100000000001976a91487bd785d0ef663988f9459fe789cdddeb44f01e188ac98d4815b060000001976a91491a4cef5dd6d25194d6bdd7b9170c312aeead6eb88ac00000000',
            witnessUtxo: {
              value: 100000,
              script: Buffer.from(
                '76a91487bd785d0ef663988f9459fe789cdddeb44f01e188ac',
                'hex'
              ),
            },
          },
          {
            hash: '36028bd5c23ea4008b419ad15b4f6c8e19164b4b147b63dd59d163cf38ce8489',
            index: 1,
            value: 8656700,
            txHex:
              '0200000001dd141402f7329857f56dbe539280b1e0caa9929694b6699dfb4109811401e254010000006a473044022014487cfbdd3f4552202ae83b4b48198efaaa9d2b643d0cfe713431f6d2442979022007ddece26ee8ede18d1b0cf28971f09877ec4897cd4c20e49fe88ab1d4e2adf0012102f4b68f4728167aeac15417c03ce1884abc2dbe2ccee6901ec3d1df11115fe4a8ffffffff0280bcad8c060000001976a914e761135b98e7abd4c313894f2e8db111ba3f6e7c88ac3c178400000000001976a91487bd785d0ef663988f9459fe789cdddeb44f01e188ac00000000',
            witnessUtxo: {
              value: 8656700,
              script: Buffer.from(
                '76a91487bd785d0ef663988f9459fe789cdddeb44f01e188ac',
                'hex'
              ),
            },
          },
        ])
      ),
      gasFeeOptions: jest.fn(() =>
        Promise.resolve({
          high: 250000000,
          low: 25000000,
          medium: 25000000,
        })
      ),
      manifest: {
        name: 'Dogecoin',
        description: '',
        rpcURL: 'https://blockstream.info',
        chainSymbol: 'DOGE',
        blockExplorerURL: 'https://blockchair.com/dogecoin',
        chainId: 'dogecoin',
        chain: 'dogecoin',
        decimals: 8,
        feeGasStep: {
          high: 1,
          medium: 1,
          low: 1,
        },
        maxGapAmount: 0.0001,
      },
    };
  });

  it('buildTx with insufficient balance should throw an error', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        to: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        amount: 1001,
      },
      mockProvider,
      MsgEncoding.object
    );

    await expect(chainMsg.buildTx()).rejects.toThrowError();
  });

  it('getFee should return fee estimation', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        to: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        amount: 0.000001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getFee();
    const feeOptions = await mockProvider.gasFeeOptions();

    expect(response.fee).toEqual(
      new BigNumber(feeOptions[GasFeeSpeed.medium] as number)
        .dividedBy(10 ** mockProvider.manifest.decimals)

        .toString()
    );
    expect(response.maxFee).toBeNull();
  });

  it('should return MaxAmountToSend with native token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        to: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        amount: 0.000001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getMaxAmountToSend();

    const newMsg = new ChainMsg(
      {
        from: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        to: 'DPC5kxw8hwpkYYd4dYQdKsrVUjkxtfc6Vj',
        amount: response,
      },
      mockProvider,
      MsgEncoding.object
    );
    const { inputs, outputs } = await newMsg.buildTx();
    const txSize = utils.transactionBytes(inputs, outputs);
    expect(txSize).toEqual(110);
    expect(response).toEqual('0.059067'); // (8656700 - 25000 * txSize) / 10^8
  });
});
