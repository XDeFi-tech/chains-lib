import { Msg, MsgEncoding } from '@xdefi-tech/chains-core';
import { Connection } from '@solana/web3.js';

import { SolanaProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { SOLANA_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import PrivateKeySigner from './private-key.signer';

jest.mock('../datasource/indexer/queries/fees.query', () => ({
  getFees: jest.fn().mockResolvedValue({
    data: { solana: { fee: '0' } },
  }),
}));

describe('private-key.signer', () => {
  let privateKey: string;
  let signer: PrivateKeySigner;
  let provider: SolanaProvider;
  let txInput: MsgBody;
  let message: Msg;

  beforeEach(() => {
    privateKey =
      '22d58eee867e660f58cd4e6699eaeb058a613c5fb1c738e6de5fe02d7839eafba3c563b0519a293f7323680e09a6a3b4bb9a451ed3eaaf7067cc38505563f3c6';
    signer = new PrivateKeySigner(privateKey);

    provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));

    txInput = {
      from: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      to: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      amount: 0.000001,
      priorityFeeAmount: 10000,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from a private key', async () => {
    expect(await signer.getAddress('')).toBe(txInput.from);
  });

  it('should sign a transaction using a private key', async () => {
    jest.spyOn(Connection.prototype, 'getRecentBlockhash').mockResolvedValue({
      blockhash: '9uGQVaoBdc2u6cjZmX4A8yLzrNCBLEeD5UY6conMuGLD',
      feeCalculator: { lamportsPerSignature: 5000 },
    });
    await signer.sign(message as ChainMsg);

    expect(message.signedTransaction.toString('hex')).toBe(
      '01cddbcf18f06a7d75dd6da254bf1c8169bae2446fce1c55fca85930e11b29ea6e4968335156697f6662d4768ba27102384c1be5a95dcc818a3e478387f3bc620b01000203a3c563b0519a293f7323680e09a6a3b4bb9a451ed3eaaf7067cc38505563f3c600000000000000000000000000000000000000000000000000000000000000000306466fe5211732ffecadba72c39be7bc8ce5bbc5f7126b2c439b3a4000000084411db3e89763453608d1096cf16877aac2dba6a0a73d094d32aba4540031f602020009031027000000000000010200000c02000000e803000000000000'
    );
  });

  it('should sign swap transaction using a private key', async () => {
    // { data: unsigned_transaction }
    const message = provider.createMsg(
      {
        data: 'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAIEqPFY7BRmik/cyNoDgmmo7S7mkUe0+qvcGfMOFBVY/PGC0gHT3W46jBpye0/BrwyGXgq5M2OXJ03SYJWsZhLnVAYos0BsrC37jVlX/Vn5Q9KxLuWNrDEdNT9KE4XS5/OITCkaOhIxPmykeLLLMqzHdpBqQdLmz6MUN48EVjty7hdMndigMGDbe3oTj+jtnfcgfFxxHqcbDoPBzJEmyLVup9Y72d/tWNeZHNyS3Dha2QFVANOpHocez/NiIU8QV0yVJFbUfHYO+wmpkfQYM16kVO3/w0v2SgCmUZir7W2V/92pxvmolYk6AUyDKEbxiFrbSuk6yS+R6+JYzyxTSFbpQ7ER9pbpA+NuWK/3ozeYI9qW1/DI7wnADqej6VXFIkqwNSSMI12HnhD40eCue8Myb4FjmQGUsMsN7a3k/gMefw5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBkZv5SEXMv/srbpyw5vnvIzlu8X3EmssQ5s6QAAAAAR51VvyMcBu7nTFbs5oFQf9sbLeo/SOUQKxzaJWvBOPBt324ddloZPZy+FGzut5rBy0he1fWzeROoz1hX7/AKk6uJA/tzXKscZ8Wa9IV+32Gwr4MqUKfFnjIZGeDsipvIyXJY9OJInxuz0QKRSODYMLWhOZ2v8QhASOe9jb6fhZnT21vEgNBO61RFhv0mqz1/MY4fI4sUEKqVUcWMKq7sG0P/on9df2SnTAmx8pWHneSwmrNt/J3VFLMhqns4zl6BLggbp1ost7bEXnGVYyD/+e/JA4GIthWUifYiIYo592CAsABQLAXBUACwAJAwQXAQAAAAAADwYABgAmCg0BAQoCAAYMAgAAAEBCDwAAAAAADQEGAREPBgAIABAKDQEBDDsNDgAGBQIIJhAMDBEMJA4jFQUBFhIUDQMTBwQMJRklGhcBCSkqGyUODQ0oJRgcDCcNDiICHQkgHiEfKy3BIJszQdacgQQDAAAAGmQAASZkAQIRAGQCA0BCDwAAAAAAODpBAwAAAAAsAQANAwYAAAEJA3r60BRSgD2xDk9lOwWoO5wdTzQDXCyoyoVBYRNWXBV3BYF5foB/Ant66Bv+RXr1W8wTHxVfNfAEDnY9unRf1hhg4opmS4jTOxoGv+rE6OfDBi0fBjLCwDexatjpZ3Z5p69xntxhOJDwMeTrdfusl3mqDEIy6QGYBoCBeX5/eAF8',
      },
      MsgEncoding.base64
    );
    await signer.sign(message as ChainMsg);

    expect(message.signedTransaction.toString('hex')).toBe(
      '01a04ccd06ebc893b53138ebf6f059fc51ec892fa00d19dff2ac9d2a4bdc3bc59bc8436f794cc40642e12f9e6a84dc1a4a9ac6129fff8653444e6647f5ce43c2098001000812a3c563b0519a293f7323680e09a6a3b4bb9a451ed3eaaf7067cc38505563f3c60b48074f75b8ea3069c9ed3f06bc3219782ae4cd8e5c9d37498256b1984b9d5018a2cd01b2b0b7ee35655ff567e50f4ac4bb9636b0c474d4fd284e174b9fce2130a468e848c4f9b291e2cb2ccab31dda41a9074b9b3e8c50de3c1158edcbb85d32776280c1836dede84e3fa3b677dc81f171c47a9c6c3a0f0732449b22d5ba9f58ef677fb5635e6473724b70e16b640554034ea47a1c7b3fcd88853c415d3254915b51f1d83bec26a647d060cd7a9153b7ff0d2fd92802994662afb5b657ff76a71be6a25624e805320ca11bc6216b6d2ba4eb24be47af89633cb14d215ba50ec447da5ba40f8db962bfde8cde608f6a5b5fc323bc27003a9e8fa55714892ac0d492308d761e7843e34782b9ef0cc9be058e640652c32c37b6b793f80c79fc3900000000000000000000000000000000000000000000000000000000000000000306466fe5211732ffecadba72c39be7bc8ce5bbc5f7126b2c439b3a400000000479d55bf231c06eee74c56ece681507fdb1b2dea3f48e5102b1cda256bc138f06ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a93ab8903fb735cab1c67c59af4857edf61b0af832a50a7c59e321919e0ec8a9bc8c97258f4e2489f1bb3d1029148e0d830b5a1399daff1084048e7bd8dbe9f8599d3db5bc480d04eeb544586fd26ab3d7f318e1f238b1410aa9551c58c2aaeec1b43ffa27f5d7f64a74c09b1f295879de4b09ab36dfc9dd514b321aa7b38ce5e812e081ba75a2cb7b6c45e71956320fff9efc9038188b6159489f622218a39f76080b000502c05c15000b00090304170100000000000f06000600260a0d01010a0200060c0200000040420f00000000000d010601110f06000800100a0d01010c3b0d0e000605020826100c0c110c240e231505011612140d031307040c2519251a170109292a1b250e0d0d2825181c0c270d0e22021d09201e211f2b2dc1209b3341d69c8104030000001a64000126640102110064020340420f0000000000383a4103000000002c01000d030600000109037afad01452803db10e4f653b05a83b9c1d4f34035c2ca8ca85416113565c15770581797e807f027b7ae81bfe457af55bcc131f155f35f0040e763dba745fd61860e28a664b88d33b1a06bfeac4e8e7c3062d1f0632c2c037b16ad8e9677679a7af719edc613890f031e4eb75fbac9779aa0c4232e90198068081797e7f78017c'
    );
  });

  it('should return false when verifing an invalid address', async () => {
    expect(signer.verifyAddress('0xDEADBEEF')).toBe(false);
  });

  it('should validate an address', async () => {
    expect(signer.verifyAddress(txInput.from)).toBe(true);
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey('')).toEqual(privateKey);
  });
});
