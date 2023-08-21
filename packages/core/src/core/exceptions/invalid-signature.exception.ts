export const INVALID_SIGNATURE_EXCEPTION = 'INVALID_SIGNATURE_EXCEPTION';

export class InvalidSignatureException extends Error {
  constructor() {
    super();
    this.name = INVALID_SIGNATURE_EXCEPTION;
    this.message = 'Some message do not have signature, sign it first';
  }
}
