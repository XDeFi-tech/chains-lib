export const CHAINS_EXCEPTION = 'CHAINS_EXCEPTION';

export class ChainsException extends Error {
  constructor(message: string) {
    super(message);
    this.name = CHAINS_EXCEPTION;
    this.message = message;
  }
}
