import "reflect-metadata";
import { ChainMsg } from "./msg";
import { EvmProvider } from "./chain.provider";

const ADDRESS_MOCK = {
    address: "0xCbA98362e199c41E1864D0923AF9646d3A648451",
    publicKey:
        "04df00ad3869baad7ce54f4d560ba7f268d542df8f2679a5898d78a690c3db8f9833d2973671cb14b088e91bdf7c0ab00029a576473c0e12f84d252e630bb3809b",
};

const SIGN_MOCK = {
    v: "1",
    r: "2",
    s: "3",
};

describe("chain.provider", () => {
    it("verifyAddress(): should return FALSE if address is invalid", () => {
        const provider = new EvmProvider();
        expect(provider.verifyAddress("Hello World")).toBeFalsy();
    });

    it("verifyAddress(): should return TRUE if address is valid", () => {
        const signer = new EvmProvider();
        expect(signer.verifyAddress(ADDRESS_MOCK.address)).toBeTruthy();
    });

    it("getAddress(): should throw an error if derivation path is invalid", async () => {
        const signer = new EvmProvider();
        await expect(signer.getAddress("0/0/0/0/0")).rejects.toEqual("Error");
    });

    it("getAddress(): should return address", async () => {
        const signer = new EvmProvider();
        await expect(signer.getAddress("44'/60'/0'/0/0")).resolves.toEqual(
            ADDRESS_MOCK.address
        );
    });

    it("sign(): show throw an error if msg is invalid", async () => {
        const signer = new EvmProvider();
        await expect(
            signer.sign("44'/60'/0'/0/0", ChainMsg.fromData({}))
        ).rejects.toEqual("Error");
    });

    it("sign(): show return signature", async () => {
        const signer = new EvmProvider();
        await expect(
            signer.sign("44'/60'/0'/0/0", ChainMsg.fromData({}))
        ).resolves.toEqual({
            v: 1,
            r: "0x2",
            s: "0x3",
        });
    });
});

// describe("EVMProvider", () => {
//     let evmProvider: EVMProvider;
//
//     beforeEach(() => {
//         evmProvider = new EVMProvider();
//         jest.spyOn(evmProvider, 'chainProvider', 'get').mockReturnValue({
//             getTransactions: jest.fn().mockResolvedValue([])
//         });
//     });
//
//     afterEach(() => {
//         jest.clearAllMocks();
//     });
//
//     test("getTransactions should call EthereumProvider._checkAddress with correct parameters", async () => {
//         const spy = jest.spyOn(EthereumProvider, '_checkAddress');
//         const address = '0x123';
//         const afterBlock = 123;
//         await evmProvider.getTransactions(address, afterBlock);
//         expect(spy).toHaveBeenCalledWith(address);
//     });
//
//     test("getTransactions should call chainProvider.getTransactions with correct parameters", async () => {
//         const address = '0x123';
//         const afterBlock = 123;
//         await evmProvider.getTransactions(address, afterBlock);
//         expect(evmProvider.chainProvider.getTransactions).toHaveBeenCalledWith(address, afterBlock);
//     });
//
//     test("getTransactions should return the correct value", async () => {
//         const expectedValue = [{ from: '0x123', to: '0x456', value: '1' }];
//         jest.spyOn(evmProvider, 'chainProvider', 'get').mockReturnValue({
//             getTransactions: jest.fn().mockResolvedValue(expectedValue)
//         });
//         const address = '0x123';
//         const afterBlock = 123;
//         const result = await evmProvider.getTransactions(address, afterBlock);
//         expect(result).toEqual(expectedValue);
//     });
// });

