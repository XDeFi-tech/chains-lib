export const METHOD_NOT_IMPLEMENTED_EXCEPTION = 'METHOD_NOT_IMPLEMENTED_EXCEPTION';

export class MethodNotImplementedException extends Error {
  constructor() {
    super();
    this.name = METHOD_NOT_IMPLEMENTED_EXCEPTION;
    this.message = 'Method not implemented';
  }
}
