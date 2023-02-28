import { Transaction } from './transaction';

type InputData = {
    hash: string;
};

class MyTransaction extends Transaction<InputData> {
    public toData(): Transaction.Data {
        return {
            hash: '',
            to: '',
            from: '',
            status: ''
        };
    }
}

const TRANSACTION_DATA: InputData = {
    hash: '0x1366a578b902e49ab3c1cea1941c808e8e6565181931f986a2468e7640dfed6e',
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
