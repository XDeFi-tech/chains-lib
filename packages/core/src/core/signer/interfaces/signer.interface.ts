export enum SignerType {
  LEDGER = 'LEDGER',
  TREZOR = 'TREZOR',
  PRIVATE_KEY = 'PRIVATE_KEY',
  SEED_PHRASE = 'SEED_PHRASE',
  TRUST_WALLET = 'TRUST_WALLET',
  LATTICE = 'LATTICE',
  CUSTOM = 'CUSTOM', // if you wanna write your own signer use SignerType.CUSTOM
}
