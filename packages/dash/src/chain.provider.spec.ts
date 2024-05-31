import { ChainMsg } from '@xdefi-tech/chains-utxo';
import { TransactionAction, TransactionStatus } from '@xdefi-tech/chains-core';

import { DashProvider } from './chain.provider';
import { ChainDataSource } from './datasource';
import { DASH_MANIFEST } from './manifests';

describe('chain.provider', () => {
  let provider: DashProvider;

  beforeEach(() => {
    jest.clearAllMocks();

    provider = new DashProvider(new ChainDataSource(DASH_MANIFEST));
  });

  it('createMsg(): should create message with data', () => {
    const msg = provider.createMsg({
      to: 'XjqJ2Lcg5wgzgHE219GPYBG5tqXTsHsnsk',
      from: 'XjqJ2Lcg5wgzgHE219GPYBG5tqXTsHsnsk',
      amount: 0.000001,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
  });

  it('should throw an error when broadcasting an unsigned tx', async () => {
    const msg = provider.createMsg({
      to: 'XjqJ2Lcg5wgzgHE219GPYBG5tqXTsHsnsk',
      from: 'XjqJ2Lcg5wgzgHE219GPYBG5tqXTsHsnsk',
      amount: 0.000001,
    });

    expect(provider.broadcast([msg])).rejects.toThrow();
  });

  it('should return a transaction', async () => {
    jest.spyOn(provider.dataSource.api, 'get').mockResolvedValue({
      data: {
        txid: '14b94169246258b00126eca4a34e0a5e4d7174b32e452df2134ea33103a05852',
        version: 1,
        locktime: 0,
        vin: [
          {
            txid: '6c84c297dea2dcb136198a73efc85d2bfe07b86cc07cec1bbb488edb4634e6e5',
            vout: 0,
            sequence: 4294967295,
            n: 0,
            scriptSig: {
              hex: '473044022061abfa1c634029b381fef393c195a1ed7b97476703fee49beb1fe586bae2172d022077e00775b1f4dbef7267439d9bce5ba93d8e30796847725dd7d9447b68132c450121035a7b77ab9945d322d211fe58275030307d4e5be58cb9f4086dfc96a759007af1',
              asm: '3044022061abfa1c634029b381fef393c195a1ed7b97476703fee49beb1fe586bae2172d022077e00775b1f4dbef7267439d9bce5ba93d8e30796847725dd7d9447b68132c45[ALL] 035a7b77ab9945d322d211fe58275030307d4e5be58cb9f4086dfc96a759007af1',
            },
            addr: 'XcXKjw8BcbyaoPwPbfk9hkKUeta7GMrFRG',
            valueSat: 3677278583,
            value: 36.77278583,
            doubleSpentTxID: null,
          },
          {
            txid: 'e20b7c9f7a3d43112402202f579234350d2cf18c838f4dbfdb37b9a5f7ddccca',
            vout: 1,
            sequence: 4294967295,
            n: 1,
            scriptSig: {
              hex: '483045022100a002f62adbe695f2b1a051b86be1d5ce9ea4beecc69c2d272ab29d7a5d9a4fee022008b01fdb80f7b7c0feddbcae4930539505b697f42d6964c229954f055e812a3a0121035a7b77ab9945d322d211fe58275030307d4e5be58cb9f4086dfc96a759007af1',
              asm: '3045022100a002f62adbe695f2b1a051b86be1d5ce9ea4beecc69c2d272ab29d7a5d9a4fee022008b01fdb80f7b7c0feddbcae4930539505b697f42d6964c229954f055e812a3a[ALL] 035a7b77ab9945d322d211fe58275030307d4e5be58cb9f4086dfc96a759007af1',
            },
            addr: 'XcXKjw8BcbyaoPwPbfk9hkKUeta7GMrFRG',
            valueSat: 2944386596,
            value: 29.44386596,
            doubleSpentTxID: null,
          },
          {
            txid: '5b3e72a584d053155bcd01652bca566b618794593662d84859e538505a5b3b3c',
            vout: 0,
            sequence: 4294967295,
            n: 2,
            scriptSig: {
              hex: '47304402206a9f3a99f51bb801dfda46d9a2dca8584a10522c1eb25b4f6ad3ef440e81b80502203ebb249f9cc235540ea96419b7fd012716ddf9b9557a0429b4523a8ae7bfb7d60121035a7b77ab9945d322d211fe58275030307d4e5be58cb9f4086dfc96a759007af1',
              asm: '304402206a9f3a99f51bb801dfda46d9a2dca8584a10522c1eb25b4f6ad3ef440e81b80502203ebb249f9cc235540ea96419b7fd012716ddf9b9557a0429b4523a8ae7bfb7d6[ALL] 035a7b77ab9945d322d211fe58275030307d4e5be58cb9f4086dfc96a759007af1',
            },
            addr: 'XcXKjw8BcbyaoPwPbfk9hkKUeta7GMrFRG',
            valueSat: 3164476691,
            value: 31.64476691,
            doubleSpentTxID: null,
          },
        ],
        vout: [
          {
            value: '69.84058316',
            n: 0,
            scriptPubKey: {
              hex: '76a9147f5a7a556f87a8dbc6346af23d5f4ed421d8767788ac',
              asm: 'OP_DUP OP_HASH160 7f5a7a556f87a8dbc6346af23d5f4ed421d87677 OP_EQUALVERIFY OP_CHECKSIG',
              addresses: ['XnJE38PmUVety23XSNX9Vtdc125hgGUe9n'],
              type: 'pubkeyhash',
            },
            spentTxId: null,
            spentIndex: null,
            spentHeight: null,
          },
          {
            value: '28.02078334',
            n: 1,
            scriptPubKey: {
              hex: '76a9141423637c1f3aad9fae867a38c3bbe301cab3928f88ac',
              asm: 'OP_DUP OP_HASH160 1423637c1f3aad9fae867a38c3bbe301cab3928f OP_EQUALVERIFY OP_CHECKSIG',
              addresses: ['XcXKjw8BcbyaoPwPbfk9hkKUeta7GMrFRG'],
              type: 'pubkeyhash',
            },
            spentTxId: null,
            spentIndex: null,
            spentHeight: null,
          },
        ],
        blockhash:
          '000000000000000101471ad1cbae45517769dd86f0b91f3678de031fe6d2f718',
        blockheight: 2080307,
        confirmations: 4,
        time: 1717146175,
        blocktime: 1717146175,
        valueOut: 97.8613665,
        size: 520,
        valueIn: 97.8614187,
        fees: 0.0000522,
        txlock: true,
      },
    });

    const tx = (await provider.getTransaction(
      '14b94169246258b00126eca4a34e0a5e4d7174b32e452df2134ea33103a05852'
    ))!;

    expect(tx.hash).toEqual(
      '14b94169246258b00126eca4a34e0a5e4d7174b32e452df2134ea33103a05852'
    );
    expect(tx.from).toEqual('XcXKjw8BcbyaoPwPbfk9hkKUeta7GMrFRG');
    expect(tx.to).toEqual('XnJE38PmUVety23XSNX9Vtdc125hgGUe9n');
    expect(tx.status).toEqual(TransactionStatus.success);
    expect(tx.action).toEqual(TransactionAction.SEND);
    expect(tx.date).toEqual(1717146175000);
  });

  it('should return a coinbase transaction', async () => {
    jest.spyOn(provider.dataSource.api, 'get').mockResolvedValue({
      data: {
        txid: 'cada36350fd90ba9c2c47586940e83c58cf3a98d6208bace68c02ecf11c73ebf',
        version: 3,
        type: 5,
        locktime: 0,
        extraPayloadSize: 175,
        extraPayload:
          '03003ebe1f0028252203870e964d666c409196ca8b7b6f4033d89b21ae8109069f56c8db9933a996aa61b516e7bf04b70394a5ae9316cb92adb08614fb032669b295114d195201a3c1f3a72b5a22da20e5a0d773c7599be0be871699fa93d5df7c46e06a9a54b057b84bc0e324e7612ee9c1e66309307e1192fdea2efe41510cc4670080d9bf2c17954405ed7721fa22aae73f0474efe7e1e6cd583590991065b67b47f28c1a9a0000000000000000',
        vin: [
          {
            coinbase:
              '033ebe1f194d696e656420627920416e74506f6f6c20ae000b007c3da0706ed5000092040000',
            sequence: 4294967295,
            n: 0,
          },
        ],
        vout: [
          {
            value: '1.53978324',
            n: 0,
            scriptPubKey: {
              hex: '76a914f07412481f3863b20c03329d928949b5d5bf047888ac',
              asm: 'OP_DUP OP_HASH160 f07412481f3863b20c03329d928949b5d5bf0478 OP_EQUALVERIFY OP_CHECKSIG',
              addresses: ['XxcF45MeuUqs9SFrYQ7ighdkvDvRbpiH3j'],
              type: 'pubkeyhash',
            },
            spentTxId: null,
            spentIndex: null,
            spentHeight: null,
          },
          {
            value: '0.51326109',
            n: 1,
            scriptPubKey: {
              hex: '76a9140bc729447753bb2b0fbda9a555a30ca3aee7aecb88ac',
              asm: 'OP_DUP OP_HASH160 0bc729447753bb2b0fbda9a555a30ca3aee7aecb OP_EQUALVERIFY OP_CHECKSIG',
              addresses: ['Xbm7rKtNtbyuHfPbFuQLvaSySt8MXBcZ8T'],
              type: 'pubkeyhash',
            },
            spentTxId: null,
            spentIndex: null,
            spentHeight: null,
          },
        ],
        blockhash:
          '000000000000000cbc5e9dd8d661b06f3800c81f8ef7222f25cda0475fda7be1',
        blockheight: 2080318,
        confirmations: 2,
        time: 1717148769,
        blocktime: 1717148769,
        isCoinBase: true,
        valueOut: 2.05304433,
        size: 333,
        txlock: true,
        cbTx: {
          version: 3,
          height: 2080318,
          merkleRootMNList:
            '3399dbc8569f060981ae219bd833406f7b8bca9691406c664d960e8703222528',
          merkleRootQuorums:
            '52194d1195b2692603fb1486b0ad92cb1693aea59403b704bfe716b561aa96a9',
          bestCLHeightDiff: 1,
          bestCLSignature:
            'a3c1f3a72b5a22da20e5a0d773c7599be0be871699fa93d5df7c46e06a9a54b057b84bc0e324e7612ee9c1e66309307e1192fdea2efe41510cc4670080d9bf2c17954405ed7721fa22aae73f0474efe7e1e6cd583590991065b67b47f28c1a9a',
          creditPoolBalance: 0,
        },
      },
    });

    const tx = (await provider.getTransaction(
      'cada36350fd90ba9c2c47586940e83c58cf3a98d6208bace68c02ecf11c73ebf'
    ))!;

    expect(tx.hash).toEqual(
      'cada36350fd90ba9c2c47586940e83c58cf3a98d6208bace68c02ecf11c73ebf'
    );
    expect(tx.from).toEqual('');
    expect(tx.to).toEqual('XxcF45MeuUqs9SFrYQ7ighdkvDvRbpiH3j');
    expect(tx.status).toEqual(TransactionStatus.success);
    expect(tx.action).toEqual(TransactionAction.SEND);
    expect(tx.date).toEqual(1717148769000);
  });

  it('should get fee options', async () => {
    const feeOptions = await provider.gasFeeOptions();

    expect(feeOptions?.low).toEqual(0);
    expect(feeOptions?.medium).toEqual(5);
    expect(feeOptions?.high).toEqual(10);
  });

  it('should get a balance', async () => {
    jest.spyOn(provider.dataSource.api, 'get').mockResolvedValue({
      data: 1337 * 1e8,
    });

    const balance = await provider.getBalance(
      'Xn2B7Fpr4dhoQS8vVXGWJkHwomVJmCtQH6'
    );

    const [data] = await balance.getData();

    expect(data.asset.name).toEqual(DASH_MANIFEST.name);
    expect(data.asset.chainId).toEqual(DASH_MANIFEST.chainId);
    expect(data.asset.symbol).toEqual(DASH_MANIFEST.chainSymbol);
    expect(data.asset.native).toEqual(true);

    expect(data.amount.toString()).toEqual('1337');
  });

  it('should throw for a non-existant transaction on the blockchain', async () => {
    expect(
      provider.getTransaction(
        'deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef'
      )
    ).rejects.toThrow();
  });

  it('should receive transaction list', async () => {
    jest.spyOn(provider.dataSource.api, 'get').mockResolvedValue({
      data: {
        pagesTotal: 1,
        txs: [
          {
            txid: '5f204d4dbdcc4aac25028060ee1897eea69d344e5c4f4df0f384dd5d003d7c54',
            version: 3,
            locktime: 0,
            vin: [
              {
                txid: '28d593da6fa82c2904a120d11047c429302d4102a5ef8f2a79eaea2f7ac022fd',
                vout: 1,
                sequence: 4294967295,
                n: 0,
                scriptSig: {
                  hex: '4730440220716a66e24562f182540336bd9c89e479b8ebb57c7971e261b9c91948b8c1c47b02205eea47a0f2ddf610e5fb385459b094eaec99a358d3df09dc0f956439861c6a04012103f569e312726513348b0761c8a0aee73527a98011c98d446aeeeb1e370b0adb54',
                  asm: '30440220716a66e24562f182540336bd9c89e479b8ebb57c7971e261b9c91948b8c1c47b02205eea47a0f2ddf610e5fb385459b094eaec99a358d3df09dc0f956439861c6a04[ALL] 03f569e312726513348b0761c8a0aee73527a98011c98d446aeeeb1e370b0adb54',
                },
                addr: 'Xeh4Jxvqe7QqMLnqDVzca8Cb9SDkAwjevA',
                valueSat: 2277480259,
                value: 22.77480259,
                doubleSpentTxID: null,
              },
            ],
            vout: [
              {
                value: '0.77382929',
                n: 0,
                scriptPubKey: {
                  hex: '76a91475255ad31b3830ffdecae245508e68e2e07599a788ac',
                  asm: 'OP_DUP OP_HASH160 75255ad31b3830ffdecae245508e68e2e07599a7 OP_EQUALVERIFY OP_CHECKSIG',
                  addresses: ['XmNFe9rcN4oynruui6FAjdBaNuoS7iSppG'],
                  type: 'pubkeyhash',
                },
                spentTxId: null,
                spentIndex: null,
                spentHeight: null,
              },
              {
                value: '22.00093330',
                n: 1,
                scriptPubKey: {
                  hex: '76a9142beaeb47f9b748a1a1bf3e13dbb60206aebc00ae88ac',
                  asm: 'OP_DUP OP_HASH160 2beaeb47f9b748a1a1bf3e13dbb60206aebc00ae OP_EQUALVERIFY OP_CHECKSIG',
                  addresses: ['Xeh4Jxvqe7QqMLnqDVzca8Cb9SDkAwjevA'],
                  type: 'pubkeyhash',
                },
                spentTxId: null,
                spentIndex: null,
                spentHeight: null,
              },
            ],
            blockheight: -1,
            confirmations: 0,
            time: 1717011133,
            valueOut: 22.77476259,
            size: 225,
            valueIn: 22.77480259,
            fees: 0.00004,
            txlock: false,
          },
          {
            txid: '28d593da6fa82c2904a120d11047c429302d4102a5ef8f2a79eaea2f7ac022fd',
            version: 3,
            locktime: 0,
            vin: [
              {
                txid: '57a2aef41096b4a02dfdbaada366eeb882cd91382bd16d16ad520a0589e6b6fd',
                vout: 1,
                sequence: 4294967295,
                n: 0,
                scriptSig: {
                  hex: '473044022027150ef859b8463612fa13948ef9b0c770f26766f2c4e0ebb320286fe4c02e1a02207c5685ce1dc1356cb6f039b72fbd5d2d700946f463eb6eaaf54e3b189ef00217012103f569e312726513348b0761c8a0aee73527a98011c98d446aeeeb1e370b0adb54',
                  asm: '3044022027150ef859b8463612fa13948ef9b0c770f26766f2c4e0ebb320286fe4c02e1a02207c5685ce1dc1356cb6f039b72fbd5d2d700946f463eb6eaaf54e3b189ef00217[ALL] 03f569e312726513348b0761c8a0aee73527a98011c98d446aeeeb1e370b0adb54',
                },
                addr: 'Xeh4Jxvqe7QqMLnqDVzca8Cb9SDkAwjevA',
                valueSat: 2403107390,
                value: 24.0310739,
                doubleSpentTxID: null,
              },
            ],
            vout: [
              {
                value: '1.25623131',
                n: 0,
                scriptPubKey: {
                  hex: '76a914b1627c09b81adcb9d49df3812d2baa5bb204866688ac',
                  asm: 'OP_DUP OP_HASH160 b1627c09b81adcb9d49df3812d2baa5bb2048666 OP_EQUALVERIFY OP_CHECKSIG',
                  addresses: ['XrrmR2pCG2hDvQ4qVhb18zejjWQPvFFUYt'],
                  type: 'pubkeyhash',
                },
                spentTxId: null,
                spentIndex: null,
                spentHeight: null,
              },
              {
                value: '22.77480259',
                n: 1,
                scriptPubKey: {
                  hex: '76a9142beaeb47f9b748a1a1bf3e13dbb60206aebc00ae88ac',
                  asm: 'OP_DUP OP_HASH160 2beaeb47f9b748a1a1bf3e13dbb60206aebc00ae OP_EQUALVERIFY OP_CHECKSIG',
                  addresses: ['Xeh4Jxvqe7QqMLnqDVzca8Cb9SDkAwjevA'],
                  type: 'pubkeyhash',
                },
                spentTxId:
                  '5f204d4dbdcc4aac25028060ee1897eea69d344e5c4f4df0f384dd5d003d7c54',
                spentIndex: 0,
                spentHeight: -1,
              },
            ],
            blockhash:
              '000000000000001632978cc932e19b310ce3c8e43070e3d9d3e6d14dd277b79f',
            blockheight: 2079440,
            confirmations: 3,
            time: 1717010932,
            blocktime: 1717010932,
            valueOut: 24.0310339,
            size: 225,
            valueIn: 24.0310739,
            fees: 0.00004,
            txlock: true,
          },
          {
            txid: '57a2aef41096b4a02dfdbaada366eeb882cd91382bd16d16ad520a0589e6b6fd',
            version: 3,
            locktime: 0,
            vin: [
              {
                txid: '1c835ee78ac9e6852948f524c1257d3ba2038dca49f010b4d5d868c0b3de6bd0',
                vout: 1,
                sequence: 4294967295,
                n: 0,
                scriptSig: {
                  hex: '483045022100d429eecb9bd17ba0259122dcfff0296801e9a96ea51b88d2a39f07fe65853b530220561496e017c640d4c65ee30ef42acd0b1230ac64328ae3efa8863e3cb9ff9137012103f569e312726513348b0761c8a0aee73527a98011c98d446aeeeb1e370b0adb54',
                  asm: '3045022100d429eecb9bd17ba0259122dcfff0296801e9a96ea51b88d2a39f07fe65853b530220561496e017c640d4c65ee30ef42acd0b1230ac64328ae3efa8863e3cb9ff9137[ALL] 03f569e312726513348b0761c8a0aee73527a98011c98d446aeeeb1e370b0adb54',
                },
                addr: 'Xeh4Jxvqe7QqMLnqDVzca8Cb9SDkAwjevA',
                valueSat: 2545019001,
                value: 25.45019001,
                doubleSpentTxID: null,
              },
            ],
            vout: [
              {
                value: '1.41907611',
                n: 0,
                scriptPubKey: {
                  hex: '76a914e927bed7ab395e875cd9bd5e0cf38d5354f9f24c88ac',
                  asm: 'OP_DUP OP_HASH160 e927bed7ab395e875cd9bd5e0cf38d5354f9f24c OP_EQUALVERIFY OP_CHECKSIG',
                  addresses: ['XwwetWn1pPLpz19AYr3Bfr9SHSAYVd3j9Y'],
                  type: 'pubkeyhash',
                },
                spentTxId: null,
                spentIndex: null,
                spentHeight: null,
              },
              {
                value: '24.03107390',
                n: 1,
                scriptPubKey: {
                  hex: '76a9142beaeb47f9b748a1a1bf3e13dbb60206aebc00ae88ac',
                  asm: 'OP_DUP OP_HASH160 2beaeb47f9b748a1a1bf3e13dbb60206aebc00ae OP_EQUALVERIFY OP_CHECKSIG',
                  addresses: ['Xeh4Jxvqe7QqMLnqDVzca8Cb9SDkAwjevA'],
                  type: 'pubkeyhash',
                },
                spentTxId:
                  '28d593da6fa82c2904a120d11047c429302d4102a5ef8f2a79eaea2f7ac022fd',
                spentIndex: 0,
                spentHeight: 2079440,
              },
            ],
            blockhash:
              '000000000000001632978cc932e19b310ce3c8e43070e3d9d3e6d14dd277b79f',
            blockheight: 2079440,
            confirmations: 3,
            time: 1717010932,
            blocktime: 1717010932,
            valueOut: 25.45015001,
            size: 226,
            valueIn: 25.45019001,
            fees: 0.00004,
            txlock: true,
          },
        ],
      },
    });

    const response = await provider.getTransactions('fake');

    const txs: any = await response.getData();

    expect(txs.length).toEqual(3);
  });

  it('should create message with memo as string', async () => {
    const memo = 'Test string memo';
    const msg = provider.createMsg({
      to: 'Xn2B7Fpr4dhoQS8vVXGWJkHwomVJmCtQH6',
      from: 'Xn2B7Fpr4dhoQS8vVXGWJkHwomVJmCtQH6',
      amount: 0.000001,
      memo: memo,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
    expect(msg.toData().memo).toEqual(memo);
  });

  it('should create message with memo as Uint8Array', async () => {
    const memo = 'Test string memo';
    const encodedMemo = new TextEncoder().encode(memo);
    const msg = provider.createMsg({
      to: 'Xn2B7Fpr4dhoQS8vVXGWJkHwomVJmCtQH6',
      from: 'Xn2B7Fpr4dhoQS8vVXGWJkHwomVJmCtQH6',
      amount: 0.000001,
      memo: encodedMemo,
    });

    expect(msg).toBeInstanceOf(ChainMsg);
    expect(msg.toData().memo).toEqual(encodedMemo);
    expect(new TextDecoder().decode(msg.toData().memo as Uint8Array)).toEqual(
      memo
    );
  });
});
