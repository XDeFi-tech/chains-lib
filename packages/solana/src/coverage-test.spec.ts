import { Coin, MsgEncoding } from '@xdefi-tech/chains-core';

import { SolanaProvider } from './chain.provider';
import { ChainDataSource } from './datasource';
import { SOLANA_MANIFEST } from './manifests';

describe('Test coverage Solana package', () => {
  let chainProvider: SolanaProvider;

  beforeEach(() => {
    chainProvider = new SolanaProvider(new ChainDataSource(SOLANA_MANIFEST));
  });

  it('getBalance() should return balance data', async () => {
    const balance = await chainProvider.getBalance(
      '2n7soqRhr69wcVS5nLTxYyuiZ1utGu1RL7fQV1BqqZaL'
    );

    const balanceData = await balance.getData();
    expect(balanceData.length).toBeGreaterThanOrEqual(0);
    if (balanceData.length > 0) {
      expect(balanceData[0]).toBeInstanceOf(Coin);
      expect(balanceData[0].amount).toBeTruthy();
    }
  });

  it('getTransaction() should return data transaction on the blockchain', async () => {
    const txData = await chainProvider.getTransaction(
      'jHTUk2zgmknbndxWnNRsamQUkUJCHvWHFBhtmLzj85CN7EfcqcenHKV8y9YaDvbvBCQcaeEDjs3HdjFi2fUUSAM'
    );

    expect(txData?.hash).toEqual(
      'GCzkrfpxjKJkHh7yFXm1rirZGdUwS4tDoTdr3MXEr1QM'
    );
  });

  it('should estimate fees correctly using chain data source', async () => {
    const msg = chainProvider.createMsg(
      {
        from: '5UghpDRDYPger6vqVCrvvvRQsg3NZ5CNzJWfPyKTZpf2',
        to: '',
        amount: '0',
        data: 'R6Ze8W3KYnRmcoDUj4quECJKBWvnALVpu3iqVBJNQiztA36ZroMbRxXK112rTJLr23zbeBDZdBp6bpFPhHkcmdjY4V6ak5igq24iFWQ4KbyoEhCcLKQJhGAuKT9u3GtZ9zdRHbTPYLJBTte67uh6SzYWCq1vfAbkF5wEm1Cdyvae5Uzyy8jo8bQ2MT3DfTgMKDkdSJtRxUHoj42byKCnDLQ6ZYmNGCWuqZ7a8DfEE6L7UpKKHFoAQ32WfiqTVhf34ULqwfdfQChhEbrZUvgzawJqMNLMuKqUb7UBWp5YFpawzJWVeVBRAAJGoGqCjmLMEmYtvjM4yrvHDkLdu63VrTqCCwphhfvrGuVtPc5wf2MSuL3VxAzRELQr1KV2hfMonuwD1y49SfmW7mYSuJjCV3wUTVhe1YKr9CsvJKZ6PXxMQdGEsvitgoxekq9Qtv4WoSUKFxkkjYGmpDMLATcGyQw2m4sAsR6N88oMiXRNr5J3oRdjixqNP5LGYKUeqRAvE5weqPVZSjXxqVWEPozk3K62XJviNihhSzQefMAfe4aAJb882XcuWWM3pUT5MuvmSA9cVd4PyYSMWUcjQe5nmy3zHmDMZMfu55TNDMQJCMiVFcFM597z9GkjUZVnZge2VDEx8jhP91grJHRdoX2Epz4MMTmpgDofv6AsmEp2t72UxYE4ZcR8mSGGZNEBxwPBSnCjozcfvPGAKvmwH3486Kw9kEp9Ugv8o8MxnkLE4K1PF1MpUSYgqHAW4feXEKBNzrh2r639xzcrqkQo2JzY9EdZwnsKXBm6wLFLnE9AwkDUeehHGViibU2uKNEUJt532DGCTFVuP5jt9Qpt7CgmpuZPBgRZYqFh67WqLgAomNNck1gDUdkQw1XmHqegB17L4Vtb4kLHWTjgKtUuD1uibsD68H7PBFwEJCgLakp7EswZCg7Xad7FabvRm5gKoFyswe8NYDUg57zFCTZ6qMPjXszbzrYbydXL5JHtUTKPg8vFLwaJfVsdH3gAr63DJPWZ6h7fP4c7rqWXeTcs2H5SreKcVXzScBW68yYQCYqxZFMKaiUPeE74qomycopjFZZoDkNTs3mQFscGSHc965bHDEZLcWAXSc1bqUWT8db135QHRyJRbtBJ41fTDsprtq5Eg9zgBjufPDxniYHE8v19KJ9qCWCxgnE1iCgispEktDVi9uaB5p6UwFdbjZWv1EWtBkHDb4iyp6oKcCsVVv6z2HzjxP1EwVuQVJsJKpEXg6SPWPNUF6Nkb1Ednro6pf8CRbfL9qgSZTHi9JhVzDifMtuQDczDKePtjzCmRB1FAH8KkA85E7UQcsv83cDdRXtq3q6QQ6EhtpZ4pm9yu4SnmNJEdmCgmUvvZ3oji6FyrKMDd95DS1KqJcdCKqeMseXSG8r4KU2GBae8VcLKgMK5Ewfg89ex34XTaUfcKZtPjvFAFfAyYadHqwHefDzDosaUBEuCLZk6gd47W5z7KUdchqnsruAU8JjUSK8F2fQT',
        tokenType: 'None',
        decimals: 9,
      },
      MsgEncoding.base58
    );
    jest
      .spyOn(chainProvider.dataSource.rpcProvider, 'getFeeForMessage')
      .mockResolvedValue({
        context: { slot: 301563792 },
        value: 45000,
      });
    jest
      .spyOn(chainProvider.dataSource.rpcProvider, 'getSlot')
      .mockResolvedValue(0);
    jest
      .spyOn(chainProvider.dataSource.rpcProvider, 'getBlock')
      .mockResolvedValue(0);
    const fee = await msg.getFee();
    expect(Number(fee.fee)).toBeGreaterThan(0);
  });
});
