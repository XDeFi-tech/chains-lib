import 'reflect-metadata';
import { ChainMsg } from './msg';
import { EvmProvider } from './chain.provider';
import { IndexerDataSource } from './datasource';
import { EVM_MANIFESTS } from './manifests';

// const ADDRESS_MOCK = {
//     address: '0xCbA98362e199c41E1864D0923AF9646d3A648451',
//     publicKey:
//         '04df00ad3869baad7ce54f4d560ba7f268d542df8f2679a5898d78a690c3db8f9833d2973671cb14b088e91bdf7c0ab00029a576473c0e12f84d252e630bb3809b',
// };

// const SIGN_MOCK = {
//     v: '1',
//     r: '2',
//     s: '3',
// };

describe('chain.provider', () => {
    let evmProvider: EvmProvider;

    beforeEach(() => {
        evmProvider = new EvmProvider(new IndexerDataSource(EVM_MANIFESTS.ethereum));
    });

    it('createMsg(): should create message with data', () => {
        const msg = evmProvider.createMsg({});

        console.log('msg', msg);

        expect(msg).toBeInstanceOf(ChainMsg);
    });

    // it("getAddress(): should throw an error if derivation path is invalid", async () => {
    //     const signer = new EvmProvider();
    //     await expect(signer.getAddress("0/0/0/0/0")).rejects.toEqual("Error");
    // });
    //
    // it("getAddress(): should return address", async () => {
    //     const signer = new EvmProvider();
    //     await expect(signer.getAddress("44'/60'/0'/0/0")).resolves.toEqual(
    //         ADDRESS_MOCK.address
    //     );
    // });
    //
    // it("sign(): show throw an error if msg is invalid", async () => {
    //     const signer = new EvmProvider();
    //     await expect(
    //         signer.sign("44'/60'/0'/0/0", ChainMsg.fromData({}))
    //     ).rejects.toEqual("Error");
    // });
    //
    // it("sign(): show return signature", async () => {
    //     const signer = new EvmProvider();
    //     await expect(
    //         signer.sign("44'/60'/0'/0/0", ChainMsg.fromData({}))
    //     ).resolves.toEqual({
    //         v: 1,
    //         r: "0x2",
    //         s: "0x3",
    //     });
    // });
});
