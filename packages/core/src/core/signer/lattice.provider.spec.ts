import { LatticeProvider } from './lattice.provider';

const testDerivationPath = "m/84'/0'/0'/0/0";

describe('lattice.provider', () => {
  it('converts derivation string to int array', () => {
    const result = LatticeProvider.convertDerivationPathToArray(testDerivationPath);
    expect(result).toEqual([2147483732, 2147483648, 2147483648, 0, 0]);
  });
});
