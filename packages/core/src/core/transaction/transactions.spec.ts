import { Transaction, TransactionData, TransactionStatus } from './transaction';

type InputData = {
  hash: string;
};

class MyTransaction extends Transaction<InputData> {
  public toData(): TransactionData {
    return {
      hash: '0x1366a578b902e49ab3c1cea1941c808e8e6565181931f986a2468e7640dfed6e',
      to: '',
      from: '',
      status: TransactionStatus.pending,
    };
  }
}

const TRANSACTION_DATA: TransactionData = {
  hash: '0x1366a578b902e49ab3c1cea1941c808e8e6565181931f986a2468e7640dfed6e',
  to: '',
  from: '',
  status: TransactionStatus.pending,
};

describe('Transaction', () => {
  it('should create new Transaction', () => {
    const transaction = new MyTransaction(TRANSACTION_DATA);
    expect(transaction).toBeInstanceOf(MyTransaction);
  });

  it('toData(): should return Transaction.Data', () => {
    const transaction = new MyTransaction(TRANSACTION_DATA);
    expect(transaction.toData()).toEqual(TRANSACTION_DATA);
  });

  it('fromData(): should create Transaction using provided data', () => {
    const transaction = MyTransaction.fromData(TRANSACTION_DATA);
    expect(transaction.toData()).toEqual(TRANSACTION_DATA);
  });
});
