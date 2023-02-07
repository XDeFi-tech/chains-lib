export abstract class Transaction<InData = {}> {
  constructor(public readonly data: InData) {}

  /**
   * Return transaction in appropriate format
   */
  public abstract toData(): Transaction.Data;

  /**
   * Create a new Transaction using provided data object
   *
   * @param `data` represents transaction
   */
  public static fromData(data: any): Transaction {
    return new (this as any)(data);
  }
}

export namespace Transaction {
  export interface Data {
    hash: string;
    to: string;
    from: string;
    value: string;
    data?: string;
  }
}
