export enum SignerType {
    LEDGER = 'LEDGER',
    TREZOR = 'TREZOR',
    PRIVATE_KEY = 'PRIVATE_KEY',
    CUSTOM = 'CUSTOM' // if you wanna write your own signer use SignerType.CUSTOM
}
