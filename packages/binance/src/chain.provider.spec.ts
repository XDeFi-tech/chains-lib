import { BinanceProvider } from './chain.provider';

describe('binance/chain.provider', () => {
  it('should return false when verifying an invalid address', () => {
    expect(BinanceProvider.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should return true when verifying a valid address', () => {
    expect(
      BinanceProvider.verifyAddress(
        'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k'
      )
    ).toBe(true);
  });

  it('should return true when verifying a valid testnet address', () => {
    expect(
      BinanceProvider.verifyAddress(
        'tbnb1q82g2h9q0kfe7sysnj5w7nlak92csfjztymp39',
        'tbnb'
      )
    ).toBe(true);
  });

  it('should return false when verifying valid address for testnet', () => {
    expect(
      BinanceProvider.verifyAddress(
        'bnb1ac5cd7esh6wx78dxwwpkk6wn3g4a42578q3r8k',
        'tbnb'
      )
    ).toBe(false);
  });
});
