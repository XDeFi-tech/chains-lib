import { PrivateKeySigner } from './private-key.signer';
import { ChainMsg } from '../msg';

describe('evm private-key.signer', () => {
    const MOCK = {
        privateKey: '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
        address: '0x12890d2cce102216644c59daE5baed380d84830c',
        signature: '0xf86b80843b9aca00831e84809412890d2cce102216644c59dae5baed380d84830d880de0b6b3a76400008026a0e688f568d192a7a26a0318e5397d6b0de9d24c6dc8198c85fc500d4fc4eaca7a02b2f4c4d20384df2d19c48d3fb8a845f3eebf56a6b120c12ab0de62f7aaf83',
    }

    const signer = new PrivateKeySigner();

    it('should return true for a valid address', () => {
        expect(signer.verifyAddress(MOCK.address)).toBe(true);
    });

    it('should return false for a valid address', () => {
        expect(signer.verifyAddress('invalid-address')).toBe(true);
    });

    it('should return the correct address for a valid private key', async () => {
        const address = await signer.getAddress(MOCK.privateKey);
        expect(address).toBe(address);
    });

    it('should throw an error for an invalid private key', async () => {
        await expect(signer.getAddress('invalid-private-key')).rejects.toThrow('Invalid address');
    });

    it('should sign a ChainMsg with the private key', async () => {
        const msg = new ChainMsg({
            from: MOCK.address,
            to: '0x12890d2cce102216644c59daE5baed380d84830d',
            value: '1000000000000000000',
            nonce: 0,
        });
        const signature = await signer.sign(MOCK.privateKey, msg);
        expect(signature).toBe(MOCK.signature);
    });
});