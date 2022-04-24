import { Asset } from './asset';

export const ASSET_DATA: Asset.Data = {
  chainId: '1',
  name: 'Ethereum',
  symbol: 'ETH',
  decimals: 18,
  icon: '',
  native: true,
};

describe('asset', () => {
  it('should create a new Asset', () => {
    const asset = new Asset(ASSET_DATA);
    expect(asset).toBeInstanceOf(Asset);
  });

  it('get(): should return default asset ID if custom ID not provided', () => {
    const asset = new Asset(ASSET_DATA);
    expect(asset.id).toEqual('1:ETH');
  });

  it('isEqual(): should return TRUE if two assets are equal', () => {
    const firstAsset = new Asset(ASSET_DATA);
    const secondAsset = new Asset(ASSET_DATA);

    expect(firstAsset.isEqual(secondAsset)).toBeTruthy();
  });

  it('isEqual(): should return FALSE if two assets are not equal', () => {
    const firstAsset = new Asset(ASSET_DATA);
    const secondAsset = new Asset({
      ...ASSET_DATA,
      symbol: 'USDT',
    });

    expect(firstAsset.isEqual(secondAsset)).toBeFalsy();
  });

  it('fromJson(): should create Asset object from JSON', () => {
    const asset = Asset.fromJson(JSON.stringify(ASSET_DATA));
    expect(asset).toBeInstanceOf(Asset);
  });

  it('fromData(): should create Asset object from Asset.Data', () => {
    const asset = Asset.fromData(ASSET_DATA);
    expect(asset).toBeInstanceOf(Asset);
  });

  it('toString(): should return Asset symbol', () => {
    const asset = new Asset(ASSET_DATA);
    expect(asset.toString()).toEqual(ASSET_DATA.symbol);
  });
});
