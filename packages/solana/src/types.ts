export type Base58String = string;

export interface SolanaSignature {
  pubKey: string;
  sig: Base58String;
}
