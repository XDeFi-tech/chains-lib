import { Chain, Injectable, Transaction } from "@xdefi/chains-core";

@Injectable()
export class Repository {
  getTransactions(
    address: string,
    network: Chain.Network,
    afterBlock?: number
  ): Promise<Transaction[]> {
    return Promise.resolve([]);
  }
}
