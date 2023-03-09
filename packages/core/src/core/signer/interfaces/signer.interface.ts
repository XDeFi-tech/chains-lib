export enum SignerType {
  LEDGER = 'LEDGER',
  TREZOR = 'TREZOR',
  PRIVATE_KEY = 'PRIVATE_KEY',
  TRUST_WALLET = 'TRUST_WALLET',
  CUSTOM = 'CUSTOM', // if you wanna write your own signer use SignerType.CUSTOM
}
