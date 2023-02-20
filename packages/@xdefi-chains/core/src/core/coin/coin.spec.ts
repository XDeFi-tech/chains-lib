import { Asset } from '../asset';
import { Coin } from './coin';

// Asset with structure from Asset Service
const MOCK_ASSET = {
    id: '5d5d7222-a934-4814-8dac-70ee9735ef01',
    name: 'Ethereum',
    symbol: 'ETH',
    image: 'https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png?1595348880',
    chain: 'Ethereum',
    contract: null,
    price: {
        amount: '1249.5',
        scalingFactor: 0,
    },
};

export const ASSET_DATA: Asset.Data = {
    chainId: '1',
    name: MOCK_ASSET.name,
    symbol: MOCK_ASSET.symbol,
    icon: MOCK_ASSET.image,
    native: !Boolean(MOCK_ASSET.contract),
    decimals: MOCK_ASSET.price.scalingFactor,
    price: MOCK_ASSET.price.amount,
};

const ASSET = new Asset(ASSET_DATA);

describe('Coin', () => {
    it('should create a new Coin', () => {
        const coin = new Coin(ASSET, '1');
        expect(coin).toBeInstanceOf(Coin);
    });

    it('toString(): should convert Coin to String (e.g. 1ETH)', () => {
        const coin = new Coin(ASSET, '1');
        expect(coin.toString()).toEqual('1ETH');
    });

    it('toData(): should return Coin as Coint.Data', () => {
        const coin = new Coin(ASSET, '1');
        expect(coin.toData()).toEqual({
            asset: ASSET,
            amount: '1',
        });
    });

    it('plus(): should throw error if asset of two coints are different', () => {
        const firstCoin = new Coin(new Asset(ASSET_DATA), '1');
        const secondCoin = new Coin(new Asset({ ...ASSET_DATA, symbol: 'USDT' }), '1');

        expect(() => firstCoin.plus(secondCoin)).toThrowError('Cannot add two Coins of different assets: ETH and USDT');
    });

    it('plus(): should add amount of one Coin to another', () => {
        const firstCoin = new Coin(ASSET, '1');
        const secondCoin = new Coin(ASSET, '1');

        expect(firstCoin.plus(secondCoin).toData()).toEqual({
            asset: ASSET,
            amount: '2',
        });
    });

    it('plus(): should add provided amount to current Coin', () => {
        const coin = new Coin(ASSET, '1');

        expect(coin.plus('1').toData()).toEqual({
            asset: ASSET,
            amount: '2',
        });
    });

    it('minus(): should throw error if asset of two coints are different', () => {
        const firstCoin = new Coin(new Asset(ASSET_DATA), '1');
        const secondCoin = new Coin(new Asset({ ...ASSET_DATA, symbol: 'USDT' }), '1');

        expect(() => firstCoin.minus(secondCoin)).toThrowError(
            'Cannot subtract two Coins of different assets: ETH and USDT'
        );
    });

    it('minus(): subtract one Coin from another', () => {
        const firstCoin = new Coin(ASSET, '1');
        const secondCoin = new Coin(ASSET, '1');

        expect(firstCoin.minus(secondCoin).toData()).toEqual({
            asset: ASSET,
            amount: '0',
        });
    });

    it('minus(): should add provided amount to current Coin', () => {
        const coin = new Coin(ASSET, '1');

        expect(coin.minus('1').toData()).toEqual({
            asset: ASSET,
            amount: '0',
        });
    });

    it('multipliedBy(): should multiply Coin amount by provided value', () => {
        const coin = new Coin(ASSET, '2');
        expect(coin.multipliedBy('2').toData()).toEqual({
            asset: ASSET,
            amount: '4',
        });
    });

    it('dividedBy(): should divide Coin amount by provided value', () => {
        const coin = new Coin(ASSET, '6');
        expect(coin.dividedBy('2').toData()).toEqual({
            asset: ASSET,
            amount: '3',
        });
    });
});
