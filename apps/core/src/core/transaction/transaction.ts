export abstract class Transaction {
  constructor(public readonly data: object) {}

  /**
   * Return transaction in appropriate format
   */
  public abstract toData(): Transaction.Data;

  /**
   * Create a new Transaction using provided data object
   *
   * @param `data` object represents transaction
   */
  public static fromData(data: object): Transaction {
    return new (Transaction as any)(data);
  }
}

export namespace Transaction {
  export interface Data {
    hash: string;
  }
}
