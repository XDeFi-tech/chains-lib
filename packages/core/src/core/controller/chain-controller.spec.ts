import ChainController from './chain-controller';


describe('ChainController', () => {
    let chainController: ChainController;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getProviderByChain should return ethereum EVM provider', () => {
        const chain = 'ethereum';
        const provider = chainController.getProviderByChain(chain);

        expect(provider.manifest.chain).toEqual(chain);
    });

    it('getProviderByType should return 3 EVM providers', () => {
        const evmProviders = chainController.getProviderByType('EVM');

        expect(evmProviders).toHaveLength(3);
    });

    it('getProviderList should return all providers (3)', () => {
        const providers = chainController.getProviderList();

        expect(providers).toHaveLength(3);
    });

    it('serializeParams should return serialized Params for all chains', () => {
        const mockParams = '';
        const params = chainController.serialize();

        expect(params).toEqual(mockParams);
    });
});
