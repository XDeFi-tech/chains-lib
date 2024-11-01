import { MsgEncoding } from '@xdefi-tech/chains-core';
import * as bitcoin from 'bitcoinjs-lib';
import utils from 'coinselect/utils';

import { ChainMsg } from './msg';
import { BitcoinProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { BITCOIN_MANIFEST } from './manifests';
import * as scanUtxosMoudle from './datasource/indexer/queries/scanUTXOs.query';
import * as feeModule from './datasource/indexer/queries/fees.query';
import * as nftModule from './datasource/indexer/queries/nfts.query';

jest.mock('./datasource/indexer/queries/scanUTXOs.query', () => {
  const originalModule = jest.requireActual(
    './datasource/indexer/queries/scanUTXOs.query'
  );
  return {
    __esModule: true,
    ...originalModule,
    scanUTXOs: jest.fn(),
  };
});
jest.mock('./datasource/indexer/queries/fees.query', () => {
  const originalModule = jest.requireActual(
    './datasource/indexer/queries/fees.query'
  );
  return {
    __esModule: true,
    ...originalModule,
    getFees: jest.fn().mockResolvedValue({
      high: 3000,
      medium: 3000, // 3000 sat/kvB => 3 sat/vB
      low: 3000,
    }),
  };
});

jest.mock('./datasource/indexer/queries/nfts.query.ts', () => {
  const originalModule = jest.requireActual(
    './datasource/indexer/queries/nfts.query'
  );
  return {
    __esModule: true,
    ...originalModule,
    getNFTBalance: jest.fn(),
  };
});

jest.mock('./datasource/indexer/queries/balances.query.ts', () => ({
  getBalance: jest.fn().mockResolvedValue([
    {
      address: 'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q',
      asset: {
        chain: 'Bitcoin',
        contract: null,
        decimals: 8,
        id: 'bcafa2bf-d442-483a-96a4-0199f4371678',
        image:
          'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
        name: 'Bitcoin',
        symbol: 'BTC',
        type: 'CRYPTOCURRENCY',
      },
      amount: {
        value: '100000000', // 1 BTC
      },
    },
  ]),
}));

describe('msg', () => {
  let provider: BitcoinProvider;
  const address = 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw';
  const mockFirstTx = new bitcoin.Transaction();
  mockFirstTx.addInput(Buffer.alloc(32, 0), 0);
  mockFirstTx.addOutput(bitcoin.address.toOutputScript(address), 10000); // TX contains ordinals
  const mockSecondTx = new bitcoin.Transaction();
  mockSecondTx.addInput(Buffer.alloc(32, 0), 0);
  mockSecondTx.addOutput(bitcoin.address.toOutputScript(address), 3000); // Tx not contain ordinals
  beforeEach(() => {
    provider = new BitcoinProvider(new IndexerDataSource(BITCOIN_MANIFEST));
    (scanUtxosMoudle.scanUTXOs as any).mockResolvedValue([
      {
        oTxHash: mockFirstTx.getHash().toString('hex'),
        oIndex: 0,
        oTxHex: mockFirstTx.toHex(),
        address: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
        isCoinbase: false,
        scriptHex: mockFirstTx.outs[0].script.toString('hex'),
        value: {
          value: '10000',
        },
      },
      {
        oTxHash: mockSecondTx.getHash().toString('hex'),
        oIndex: 0,
        oTxHex: mockSecondTx.toHex(),
        address: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
        isCoinbase: false,
        scriptHex: mockSecondTx.outs[0].script.toString('hex'),
        value: {
          value: '3000',
        },
      },
    ]);

    (nftModule.getNFTBalance as any).mockResolvedValue([
      {
        balance: {
          value: '1',
        },
        description: null,
        id: '20090103/3cdf1ac8d4f969647b88d0c448169c57f6cb1d4acbe5d2ded2fd82f04a011e04i0', // 546 sat
        name: 'Pixel Pepes #772',
        owner: 'bc1petmz5t6sue8s0s9xgnnydtgektadm3g85x2w0ahtmwpl5v0p9xtsrzgqry',
        isNftSpam: false,
        location: `${mockFirstTx.getHash().toString('hex')}:0:1000`,
        contractType: 'ORDINALS',
      },
      {
        balance: {
          value: '1',
        },
        description: null,
        id: '20090103/970b90249fdd4650938b2f2dbf6e0a2617c54b34b8f4325d13f08a1d0c596f02i0', // 546 sat
        name: 'Pixel Pepes #772',
        owner: 'bc1petmz5t6sue8s0s9xgnnydtgektadm3g85x2w0ahtmwpl5v0p9xtsrzgqry',
        isNftSpam: false,
        location: `${mockFirstTx.getHash().toString('hex')}:0:3000`,
        contractType: 'ORDINALS',
      },
    ]);
  });

  it('getFee should return fee estimation', async () => {
    const chainMsg = new ChainMsg(
      {
        from: address,
        to: address,
        amount: 0.000001,
      },
      provider,
      MsgEncoding.object
    );

    const response = await chainMsg.getFee();

    expect(response.fee).toBeTruthy();
    expect(response.maxFee).toBeNull();
  });

  it('buildTx with sufficient funds and no NFT', async () => {
    const chainMsg = new ChainMsg(
      {
        from: address,
        to: address,
        amount: 0.000001,
      },
      provider,
      MsgEncoding.object
    );
    const { inputs, outputs } = await chainMsg.buildTx();
    expect(inputs.length).toEqual(1);
    expect(inputs[0].hash).not.toEqual(
      mockFirstTx.getHash().toString('hex') // Different utxos containing ordinal
    );
    expect(outputs[0].value).toEqual(100); // 0.000001 * 10 ** 8
  });

  it('buildTx with insufficient funds and no NFT', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q',
        to: 'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q',
        amount: 0.01,
      },
      provider,
      MsgEncoding.object
    );
    try {
      await chainMsg.buildTx();
    } catch (error) {
      expect(error).toMatchObject(
        new Error('Insufficient Balance for transaction')
      );
    }
  });

  it('buildTx with nft and sufficient balance for paying the fee', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q',
        to: 'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q',
        amount: 0,
        nftId: `${mockFirstTx.getHash().toString('hex')}:0:1000`,
      },
      provider,
      MsgEncoding.object
    );
    const { inputs } = await chainMsg.buildTx();
    expect(inputs.length).toEqual(2);
    expect(inputs[0].hash).toEqual(mockFirstTx.getHash().toString('hex'));
    expect(inputs[0].index).toEqual(0);
  });

  it('buildTx with nft and insufficient balance for paying the fee', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q',
        to: 'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q',
        amount: 0,
        nftId: `${mockFirstTx.getHash().toString('hex')}:0:1000`,
        gasLimit: 100_000_000_000,
      },
      provider,
      MsgEncoding.object
    );
    try {
      await chainMsg.buildTx();
    } catch (error) {
      expect(error).toMatchObject(
        new Error('Insufficient Balance for transaction')
      );
    }
  });

  it('buildTx with non-owned nft ', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q',
        to: 'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q',
        amount: 0,
        nftId:
          'a4a1f74719c94a0343dcfde960465fd6849ca0e240c2b3169f61b3e93c64acda:0:0',
      },
      provider,
      MsgEncoding.object
    );
    try {
      await chainMsg.buildTx();
    } catch (error) {
      expect(error).toMatchObject(new Error('Cannot find ordinal to send'));
    }
  });

  it('should return MaxAmountToSend with native token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: address,
        to: address,
        amount: 0.000001,
      },
      provider,
      MsgEncoding.object
    );

    const response = await chainMsg.getMaxAmountToSend();

    expect(response);
    expect(response).toEqual('0.00002679'); // UTXOS minus fee
  });

  it('Should can not spend utxos', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'bc1petmz5t6sue8s0s9xgnnydtgektadm3g85x2w0ahtmwpl5v0p9xtsrzgqry',
        to: 'bc1petmz5t6sue8s0s9xgnnydtgektadm3g85x2w0ahtmwpl5v0p9xtsrzgqry',
        amount: 0.000001,
      },
      provider,
      MsgEncoding.object
    );
    try {
      await chainMsg.buildTx();
    } catch (error) {
      expect(error).toMatchObject(
        new Error('Insufficient Balance for transaction')
      );
    }
  });

  it('Should can spend utxos without losing ordinals', async () => {
    const chainMsg = new ChainMsg(
      {
        from: address,
        to: 'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q',
        amount: 0.00001,
        nftId: `${mockFirstTx.getHash().toString('hex')}:0:1000`,
        spendUtxosContainOrdinal: true,
      },
      provider,
      MsgEncoding.object
    );
    const response = await chainMsg.buildTx(); // Expect tx [10000, 3000] => [1000, ord_to_send, 2000 - 546, ord, 7000 - 546, amount_to_send]
    expect(response.inputs[0].hash).toEqual(
      mockFirstTx.getHash().toString('hex')
    );
    expect(response.inputs[1].hash).toEqual(
      mockSecondTx.getHash().toString('hex')
    );
    expect(response.outputs[0].value).toEqual(1000);
    expect(response.outputs[1].value).toEqual(546);
    expect(response.outputs[1].address).toEqual(
      'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q'
    );
    expect(response.outputs[2].value).toEqual(2000 - 546);
    expect(response.outputs[3].value).toEqual(546);
    expect(response.outputs[4].value).toEqual(7000 - 546);
    expect(response.outputs[5].value).toEqual(1000);
  });

  it('Should can spend utxos without losing ordinals with only utxos', async () => {
    (scanUtxosMoudle.scanUTXOs as any).mockResolvedValue([
      // Have only utxos
      {
        oTxHash: mockFirstTx.getHash().toString('hex'),
        oIndex: 0,
        oTxHex: mockFirstTx.toHex(),
        address: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
        isCoinbase: false,
        scriptHex: mockFirstTx.outs[0].script.toString('hex'),
        value: {
          value: '10000',
        },
      },
    ]);
    const chainMsg = new ChainMsg(
      {
        from: address,
        to: 'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q',
        amount: 0.00001,
        spendUtxosContainOrdinal: true,
        nftId: `${mockFirstTx.getHash().toString('hex')}:0:1000`,
      },
      provider,
      MsgEncoding.object
    );
    const response = await chainMsg.buildTx(); // Expect TX: [10000] => [amount_to_send, ord_to_send, 2000 - 546, 546, 7000 - 546 -fee]
    expect(response.inputs[0].hash).toEqual(
      mockFirstTx.getHash().toString('hex')
    );
    expect(response.outputs[0].value).toEqual(1000); // Genesis ordinal value
    expect(response.outputs[0].address).toEqual(
      'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q'
    );
    expect(response.outputs[1].value).toEqual(546);
    expect(response.outputs[1].address).toEqual(
      'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q'
    );
    expect(response.outputs[2].value).toEqual(2000 - 546);
    expect(response.outputs[3].value).toEqual(546);
    expect(response.outputs[4].value).toBeLessThan(7000 - 546);
  });

  it('Should can not spend utxos without losing ordinals with only utxos', async () => {
    (scanUtxosMoudle.scanUTXOs as any).mockResolvedValue([
      // Have only utxos
      {
        oTxHash: mockFirstTx.getHash().toString('hex'),
        oIndex: 0,
        oTxHex: mockFirstTx.toHex(),
        address: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
        isCoinbase: false,
        scriptHex: mockFirstTx.outs[0].script.toString('hex'),
        value: {
          value: '10000',
        },
      },
    ]);
    const chainMsg = new ChainMsg(
      {
        from: address,
        to: 'bc1p9uwwu7cyakk325c8cnp9hhegtl3qxd2vjeydwk7wv3wx6zj26a2s3q0v6q',
        amount: 0.00067, // 6700 sat
        spendUtxosContainOrdinal: true,
        nftId: `${mockFirstTx.getHash().toString('hex')}:0:1000`,
      },
      provider,
      MsgEncoding.object
    );
    try {
      await chainMsg.buildTx();
    } catch (error) {
      expect(error).toMatchObject(
        new Error('Cannot create transaction to send NFT and amount')
      );
    }
  });
});

describe('msg: Bitcoin dust filter', () => {
  const address = 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw';
  const mockFirstTx = new bitcoin.Transaction();
  mockFirstTx.addInput(Buffer.alloc(32, 0), 0);
  mockFirstTx.addOutput(bitcoin.address.toOutputScript(address), 1000);
  const mockSecondTx = new bitcoin.Transaction();
  mockSecondTx.addInput(Buffer.alloc(32, 0), 0);
  mockSecondTx.addOutput(bitcoin.address.toOutputScript(address), 3000);

  let provider: BitcoinProvider;

  beforeEach(() => {
    provider = new BitcoinProvider(new IndexerDataSource(BITCOIN_MANIFEST));
    (scanUtxosMoudle.scanUTXOs as any).mockResolvedValue([
      {
        oTxHash: mockFirstTx.getHash().toString('hex'),
        oIndex: 0,
        oTxHex: mockFirstTx.toHex(),
        address: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
        isCoinbase: false,
        scriptHex: mockFirstTx.outs[0].script.toString('hex'),
        value: {
          value: '1000',
        },
      },
      {
        oTxHash: mockSecondTx.getHash().toString('hex'),
        oIndex: 0,
        oTxHex: mockSecondTx.toHex(),
        address: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
        isCoinbase: false,
        scriptHex: mockSecondTx.outs[0].script.toString('hex'),
        value: {
          value: '3000',
        },
      },
    ]);

    (nftModule.getNFTBalance as any).mockResolvedValue([]);
  });

  it('should remove utxo with value 1000 sats', async () => {
    const feeRate = 8; // 8 sat/vB
    (feeModule.getFees as any).mockResolvedValue({
      high: 8000,
      medium: 8000, // 8000 sat/kvB => 8 sat/vB
      low: 8000,
    });
    const msg = provider.createMsg({
      from: address,
      to: address,
      amount: 0.00000546, // 546 sat
    });
    const utxos = await provider.scanUTXOs(address);
    expect(utxos[0].value).toBeGreaterThan(546); // 1000 > 546
    const inputUtxosSize = utils.inputBytes(utxos[0]);
    expect(inputUtxosSize * feeRate).toBeGreaterThan(utxos[0].value); // 1000 < utxo fees => bitcoin dust and shuld be removed

    const { inputs, outputs } = await msg.buildTx();
    expect(inputs.length).toBe(2);
    expect(outputs.length).toBe(2);
    expect(outputs[0].value).toEqual(546);
    expect(inputs[0].value).toEqual(1000);
  });

  it('Should not enough balances by fees', async () => {
    (feeModule.getFees as any).mockResolvedValue({
      high: 3000,
      medium: 3000, // 3000 sat/kvB => 3 sat/vB
      low: 3000,
    });
    const msg = provider.createMsg({
      from: address,
      to: address,
      amount: 0.00004, // 4000 sat
    });

    const utxos = await provider.scanUTXOs(address);
    expect(utxos[0].value + utxos[1].value).toBeGreaterThan(3000); // 4000 sat > 3000 sat
    const inputBytesSize =
      utils.inputBytes(utxos[0]) + utils.inputBytes(utxos[1]);
    const accumBytesSize = utils.transactionBytes(
      [],
      [{ address, value: 3000 }]
    );
    const fee = (inputBytesSize + accumBytesSize) * 3; // 1032
    expect(utxos[0].value + utxos[1].value).toBeLessThan(3000 + fee);
    await expect(msg.buildTx()).rejects.toThrowError(
      'Insufficient Balance for transaction'
    );
  });

  it('should contain utxo with value 1000 sats', async () => {
    const feeRate = 3;
    (feeModule.getFees as any).mockResolvedValue({
      high: 3000,
      medium: 3000, // 3000 sat/kvB => 3 sat/vB
      low: 3000,
    });
    const msg = provider.createMsg({
      from: address,
      to: address,
      amount: 0.00000546, // 546 sat
    });

    const utxos = await provider.scanUTXOs(address);
    const inputBytesSize = utils.inputBytes(utxos[0]);
    expect(utxos[0].value).toBeGreaterThan(inputBytesSize * feeRate);

    const { inputs, outputs } = await msg.buildTx();
    expect(inputs.length).toBe(1);
    expect(outputs.length).toBe(1);
    expect(outputs[0].value).toEqual(546);
    expect(inputs[0].value).toEqual(1000);
  });
});

describe('msg: getMaxAmountToSend', () => {
  let provider: BitcoinProvider;
  let chainMsg: ChainMsg;
  const from = 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw';
  const to = 'bc1petmz5t6sue8s0s9xgnnydtgektadm3g85x2w0ahtmwpl5v0p9xtsrzgqry';
  let balanceInSats = 2000; //inputUTXO
  const txBytes = 107; //sizeOfTx
  const mockSecondTx = new bitcoin.Transaction();
  mockSecondTx.addInput(Buffer.alloc(32, 0), 0);
  mockSecondTx.addOutput(
    bitcoin.address.toOutputScript(
      'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw'
    ),
    4000
  );

  beforeEach(() => {
    (scanUtxosMoudle.scanUTXOs as any).mockResolvedValue([
      {
        oTxHash:
          'e4b7161d1b26d3eee736adc70c42f7c47c901ac3bede07de2c0e002d3ead6afb',
        oIndex: 0,
        oTxHex:
          '0200000000010109e9e018877c28b71477cb885c040920169c66a2b21c3454412dd76d5d6c192a0000000000ffffffff02d0070000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a538e71000000000000160014d52ed37779898f360848ae49bb0ee089b6d36d2c024830450221009ecbf782d2a671cc369af031fd66fb83a291cbb1ec0b8ba3fe30970c437834a502203a91029d6a4a480e35a1eef9a69131cfa0159d02767fb8fe179363d23c6f66f70121022a6b486ca1b607a767fb1bf9432fa0b5031d9d1ece37ae02bc31d749d5ae65d500000000',
        address: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
        scriptHex: '00144e209aaf99f4b08cb5b583f4e87b546b00ea5a53',
        isCoinbase: null,
        value: {
          value: '2000',
        },
      },
    ]);
    provider = new BitcoinProvider(new IndexerDataSource(BITCOIN_MANIFEST));
    chainMsg = new ChainMsg(
      {
        from,
        to,
        amount: 0.000001,
      },
      provider,
      MsgEncoding.object
    );
  });

  it('should return a value when there are enough inputs to cover a fee', async () => {
    const feeRate = await chainMsg.getFeeRate();
    expect(feeRate).toEqual(3);

    const amountStr = await chainMsg.getMaxAmountToSend();
    const amount = Number(amountStr);
    const fee = txBytes * feeRate; //321
    const balanceMinusFeeInSats = balanceInSats - fee;
    expect(amount).toEqual(balanceMinusFeeInSats * 1e-8);
    expect(amount).toEqual(0.00001679);
  });
  it('should throw an error when there are not enough inputs to cover a fee', async () => {
    (feeModule.getFees as any).mockResolvedValue({
      high: 20000,
      medium: 20000, // 20000 sat/kvB => 20 sat/vB
      low: 20000,
    });

    (scanUtxosMoudle.scanUTXOs as any).mockResolvedValue([
      {
        oTxHash:
          'e4b7161d1b26d3eee736adc70c42f7c47c901ac3bede07de2c0e002d3ead6afb',
        oIndex: 0,
        oTxHex:
          '0200000000010109e9e018877c28b71477cb885c040920169c66a2b21c3454412dd76d5d6c192a0000000000ffffffff02d0070000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a538e71000000000000160014d52ed37779898f360848ae49bb0ee089b6d36d2c024830450221009ecbf782d2a671cc369af031fd66fb83a291cbb1ec0b8ba3fe30970c437834a502203a91029d6a4a480e35a1eef9a69131cfa0159d02767fb8fe179363d23c6f66f70121022a6b486ca1b607a767fb1bf9432fa0b5031d9d1ece37ae02bc31d749d5ae65d500000000',
        address: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
        scriptHex: '00144e209aaf99f4b08cb5b583f4e87b546b00ea5a53',
        isCoinbase: null,
        value: {
          value: '2000',
        },
      },
    ]);
    balanceInSats = 0;

    const feeRate = await chainMsg.getFeeRate();
    expect(feeRate).toEqual(20);
    const fee = txBytes * feeRate;
    const errorMesage = `Cost of transactions exceeds balance. balance: ${balanceInSats}sats, fee: ${fee}sats`;

    await expect(chainMsg.getMaxAmountToSend()).rejects.toThrow(errorMesage);
  });
  it('should not inputs which are cost more than there value to send', async () => {
    (feeModule.getFees as any).mockResolvedValue({
      high: 15000,
      medium: 15000, // 20000 sat/kvB => 20 sat/vB
      low: 15000,
    });
    (scanUtxosMoudle.scanUTXOs as any).mockResolvedValue([
      {
        oTxHash:
          'e4b7161d1b26d3eee736adc70c42f7c47c901ac3bede07de2c0e002d3ead6afb',
        oIndex: 0,
        oTxHex:
          '0200000000010109e9e018877c28b71477cb885c040920169c66a2b21c3454412dd76d5d6c192a0000000000ffffffff02d0070000000000001600144e209aaf99f4b08cb5b583f4e87b546b00ea5a538e71000000000000160014d52ed37779898f360848ae49bb0ee089b6d36d2c024830450221009ecbf782d2a671cc369af031fd66fb83a291cbb1ec0b8ba3fe30970c437834a502203a91029d6a4a480e35a1eef9a69131cfa0159d02767fb8fe179363d23c6f66f70121022a6b486ca1b607a767fb1bf9432fa0b5031d9d1ece37ae02bc31d749d5ae65d500000000',
        address: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
        scriptHex: '00144e209aaf99f4b08cb5b583f4e87b546b00ea5a53',
        isCoinbase: null,
        value: {
          value: '2000',
        },
      },
      {
        oTxHash: mockSecondTx.getHash().toString('hex'),
        oIndex: 0,
        oTxHex: mockSecondTx.toHex(),
        address: 'bc1qfcsf4tue7jcgedd4s06ws765dvqw5kjn2zztvw',
        scriptHex: '00144e209aaf99f4b08cb5b583f4e87b546b00ea5a53',
        isCoinbase: null,
        value: {
          value: '4000',
        },
      },
    ]);
    balanceInSats = 6000;

    const feeRate = await chainMsg.getFeeRate();
    expect(feeRate).toEqual(15);

    const amount = await chainMsg.getMaxAmountToSend();
    const utxoInputBytes = 63;
    const fee = (txBytes + utxoInputBytes) * feeRate;
    const balanceMinusFeeInSats = balanceInSats - fee;
    const expensiveInput = 2000;
    const expectedMax = balanceMinusFeeInSats - expensiveInput;
    expect(Number(amount)).toEqual(expectedMax * 1e-8);
  });
});
