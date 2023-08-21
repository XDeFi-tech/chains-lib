export const INVALID_ADDRESS_EXCEPTION = 'INVALID_ADDRESS_EXCEPTION';

export class InvalidAddressException extends Error {
  constructor() {
    super();
    this.name = INVALID_ADDRESS_EXCEPTION;
    this.message = 'Invalid address';
  }
}
