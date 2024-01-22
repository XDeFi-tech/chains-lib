export enum TransactionStatus {
  pending = 'pending',
  success = 'success',
  failure = 'failure',
}

export interface TransactionData {
  hash: string;
  to: string;
  from: string;
  status: TransactionStatus;
  data?: string;
  date?: number;
  amount?: string;
  action?: TransactionAction;
  contractAddress?: string;
}

export enum TransactionAction {
  SEND = 'send',
  RECEIVE = 'receive',
}

export abstract class Transaction<InData extends object = object> {
  constructor(public readonly data: InData) {}

  /**
   * Create a new Transaction using provided data object
   *
   * @param `data` represents transaction
   */
  public static fromData(data: any): Transaction<object> {
    return new (this as any)(data);
  }

  /**
   * Return transaction in appropriate format
   */
  public abstract toData(): TransactionData;
}
