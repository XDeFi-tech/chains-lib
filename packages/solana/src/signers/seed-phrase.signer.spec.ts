import { MsgEncoding } from '@xdefi-tech/chains-core';
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction as SolanaTransaction,
} from '@solana/web3.js';
import bs58 from 'bs58';

import { SolanaProvider } from '../chain.provider';
import { IndexerDataSource } from '../datasource';
import { SOLANA_MANIFEST } from '../manifests';
import { ChainMsg, MsgBody } from '../msg';

import SeedPhraseSigner from './seed-phrase.signer';

jest.mock('../datasource/indexer/queries/fees.query', () => ({
  getFees: jest.fn().mockResolvedValue({
    data: { solana: { fee: '0' } },
  }),
}));

describe('seed-phrase.signer', () => {
  let mnemonic: string;
  let derivation: string;
  let privateKey: string;
  let signer: SeedPhraseSigner;
  let provider: SolanaProvider;
  let txInput: MsgBody;
  let message: ChainMsg;

  beforeEach(() => {
    mnemonic =
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solution shove early arch topic';
    derivation = "m/44'/501'/0'/0'";
    privateKey =
      '22d58eee867e660f58cd4e6699eaeb058a613c5fb1c738e6de5fe02d7839eafba3c563b0519a293f7323680e09a6a3b4bb9a451ed3eaaf7067cc38505563f3c6';
    signer = new SeedPhraseSigner(mnemonic);

    provider = new SolanaProvider(new IndexerDataSource(SOLANA_MANIFEST));

    txInput = {
      from: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      to: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      amount: 0.001,
      priorityFeeAmount: 10000,
    };

    message = provider.createMsg(txInput);
  });

  it('should get an address from a seed phrase', async () => {
    expect(await signer.getAddress(derivation)).toBe(txInput.from);
  });

  it('should sign a transaction using a seed phrase', async () => {
    jest.spyOn(Connection.prototype, 'getLatestBlockhash').mockResolvedValue({
      blockhash: 'FxSFe5PnHuQZLiVf1h4AnzAmPBoQe5QfuviwvzbtheBe',
      lastValidBlockHeight: 272094550,
    });
    await signer.sign(message, derivation);

    expect(message.signedTransaction.sig).toBe(
      '3ccMvgzpkDv1Z7EZ3KDgZ7p4JbJyrYo659cKFbLmNxmhS6PFJ7gZn5vwJTYmhxrk6yPWh3go6A6esTAjpCNLR5ms'
    );
  });

  it('should sign swap base64 transaction using a seed phrase', async () => {
    // { data: unsigned_transaction }
    const message = provider.createMsg(
      {
        data: 'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAIEqPFY7BRmik/cyNoDgmmo7S7mkUe0+qvcGfMOFBVY/PGC0gHT3W46jBpye0/BrwyGXgq5M2OXJ03SYJWsZhLnVAYos0BsrC37jVlX/Vn5Q9KxLuWNrDEdNT9KE4XS5/OITCkaOhIxPmykeLLLMqzHdpBqQdLmz6MUN48EVjty7hdMndigMGDbe3oTj+jtnfcgfFxxHqcbDoPBzJEmyLVup9Y72d/tWNeZHNyS3Dha2QFVANOpHocez/NiIU8QV0yVJFbUfHYO+wmpkfQYM16kVO3/w0v2SgCmUZir7W2V/92pxvmolYk6AUyDKEbxiFrbSuk6yS+R6+JYzyxTSFbpQ7ER9pbpA+NuWK/3ozeYI9qW1/DI7wnADqej6VXFIkqwNSSMI12HnhD40eCue8Myb4FjmQGUsMsN7a3k/gMefw5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBkZv5SEXMv/srbpyw5vnvIzlu8X3EmssQ5s6QAAAAAR51VvyMcBu7nTFbs5oFQf9sbLeo/SOUQKxzaJWvBOPBt324ddloZPZy+FGzut5rBy0he1fWzeROoz1hX7/AKk6uJA/tzXKscZ8Wa9IV+32Gwr4MqUKfFnjIZGeDsipvIyXJY9OJInxuz0QKRSODYMLWhOZ2v8QhASOe9jb6fhZnT21vEgNBO61RFhv0mqz1/MY4fI4sUEKqVUcWMKq7sG0P/on9df2SnTAmx8pWHneSwmrNt/J3VFLMhqns4zl6BLggbp1ost7bEXnGVYyD/+e/JA4GIthWUifYiIYo592CAsABQLAXBUACwAJAwQXAQAAAAAADwYABgAmCg0BAQoCAAYMAgAAAEBCDwAAAAAADQEGAREPBgAIABAKDQEBDDsNDgAGBQIIJhAMDBEMJA4jFQUBFhIUDQMTBwQMJRklGhcBCSkqGyUODQ0oJRgcDCcNDiICHQkgHiEfKy3BIJszQdacgQQDAAAAGmQAASZkAQIRAGQCA0BCDwAAAAAAODpBAwAAAAAsAQANAwYAAAEJA3r60BRSgD2xDk9lOwWoO5wdTzQDXCyoyoVBYRNWXBV3BYF5foB/Ant66Bv+RXr1W8wTHxVfNfAEDnY9unRf1hhg4opmS4jTOxoGv+rE6OfDBi0fBjLCwDexatjpZ3Z5p69xntxhOJDwMeTrdfusl3mqDEIy6QGYBoCBeX5/eAF8',
      },
      MsgEncoding.base64
    );
    await signer.sign(message, derivation);

    expect(message.signedTransaction.sig).toBe(
      '4CtKVtgpCE4HfDkaWs74L3ZCbVCHzy2Qwy4pzjRoXEX4TYhZQCfNiWoSEdiJtfYg2g9aK5YvYpEe1229tLW3HMYt'
    );
  });

  it('should sign base58 transaction using a seed phrase', async () => {
    const message = provider.createMsg(
      {
        data: '726eSG6YzuM2gGVRSbGZptsMzM17zPZP5KAv8GM96CxdtDX4BkZBVV4JbRQgrdGs83mqFBPh2j7XiFsQVhskmq7cEd3TS561e1VPTw84Z9LnXPTxJHZTgucPkmmUrDQTgtGeYMw1BiKyHYg4j9aPAULMwihHVvmjMzYwVKQVqr3PNMeYcLcw8oYNWkWfBddzoL2gJL8W8pAHGhrV46F3me4hJLxU59VU1GBKThv6LHo5frUcS3j15YFkWVaFipVQeoemiKQgjfL3q21ziEkaA8LvvoFfJmaXfAKAoyhKhrzWTzDzfk1t2UPX5qxgzXy5K7Qcst6hG1w3MSTtEbenDDLjNgmrspFw83hNftzeU2pdKQ2wjwjCAnLgzSLZBtrLNUcU9fqf5EbXYernV8qtZvRxChnzvt7ekyoyuDktVY8rk3JJDGNoyMqDF9zkrrA625eUWjSC9fedgfBACys1Q8gjBj3ET1qrj5Q9ZAst1yQtwKhzuC3tfJBtevjRByu9dgLVhW4n76DbgEPgSDjqwsGEymP6gtfbFJT8ZhhyW8yrxKASv44zkpEo3EqQuVFjteDHs3GtpP4qoMQwYHQbomccPtcv2KoDCLj45ueRsF4gsQS8QgVWS664zgPvBBqKdHqxA4gmuQpH7kL6T3w3BiTRGCZ4zZMHWbbssiDfrouYsxGJ518FfL7pMPiDvzGiJsAiDzU7mnpJpc52SmREH3ahjqf4DEiBMhorrjxKYPJ6KB5KuZv8BVmmpDgsdkt1wPbNBjJK13qmGzaueW9GVb7W1kq8wRCMhRqb6uHuofRMGZ9awcN5TKKeSCGaN68H2mHKMWbzgj7CVLAHstgTWcaqEauHxnTjfZT7njnA3WjG5vE46BSDKwBvXQcctjDEDUkGBqadKfFyvECoTF5uVwg3NizpoCEg43YJ2ACsJmkobmvsNPirnFCkY19h8FWe8fp3X2T4f4tTVeeSE3wQr6JqffZjZ4b5qzTYWLvtXoB9z5sqaJ3HoQthEvQzExByj2PLvuNGFcPZeMy7DStysnmZVb1WJhWGwA4374iQpR5Vi7Sa6yQyFhRbv2ZFE66PXziH4AKgKTQs3CKikV7cwwq5LqktFFoonr2g9EPz536zcBka4rdan6SbrVo2gTzgYDusJRjU9Yf9XRscMmx6nt246wDvVCrHdBdukCyiajzngKkJrQY9SMfh7VHhq34YtVjS6dDtLqCJmw6vnhFvjspTSoJ8czZjsadfcnki7B7fJbBjPY6iL8fFSyZtsHdu21NQxttqCQiBGk1mFj1ohwTr7a3rCLpHsn8yyaJ66iGXHruBX2CZeL61gX8wuDM',
      },
      MsgEncoding.base58
    );
    await signer.sign(message, derivation);

    expect(message.signedTransaction.sig).toBe(
      '4CtKVtgpCE4HfDkaWs74L3ZCbVCHzy2Qwy4pzjRoXEX4TYhZQCfNiWoSEdiJtfYg2g9aK5YvYpEe1229tLW3HMYt'
    );
  });

  it('should sign base58 transaction using a seed phrase', async () => {
    const message = provider.createMsg(
      {
        data: '726eSG6YzuM2gGVRSbGZptsMzM17zPZP5KAv8GM96CxdtDX4BkZBVV4JbRQgrdGs83mqFBPh2j7XiFsQVhskmq7cEd3TS561e1VPTw84Z9LnXPTxJHZTgucPkmmUrDQTgtGeYMw1BiKyHYg4j9aPAULMwihHVvmjMzYwVKQVqr3PNMeYcLcw8oYNWkWfBddzoL2gJL8W8pAHGhrV46F3me4hJLxU59VU1GBKThv6LHo5frUcS3j15YFkWVaFipVQeoemiKQgjfL3q21ziEkaA8LvvoFfJmaXfAKAoyhKhrzWTzDzfk1t2UPX5qxgzXy5K7Qcst6hG1w3MSTtEbenDDLjNgmrspFw83hNftzeU2pdKQ2wjwjCAnLgzSLZBtrLNUcU9fqf5EbXYernV8qtZvRxChnzvt7ekyoyuDktVY8rk3JJDGNoyMqDF9zkrrA625eUWjSC9fedgfBACys1Q8gjBj3ET1qrj5Q9ZAst1yQtwKhzuC3tfJBtevjRByu9dgLVhW4n76DbgEPgSDjqwsGEymP6gtfbFJT8ZhhyW8yrxKASv44zkpEo3EqQuVFjteDHs3GtpP4qoMQwYHQbomccPtcv2KoDCLj45ueRsF4gsQS8QgVWS664zgPvBBqKdHqxA4gmuQpH7kL6T3w3BiTRGCZ4zZMHWbbssiDfrouYsxGJ518FfL7pMPiDvzGiJsAiDzU7mnpJpc52SmREH3ahjqf4DEiBMhorrjxKYPJ6KB5KuZv8BVmmpDgsdkt1wPbNBjJK13qmGzaueW9GVb7W1kq8wRCMhRqb6uHuofRMGZ9awcN5TKKeSCGaN68H2mHKMWbzgj7CVLAHstgTWcaqEauHxnTjfZT7njnA3WjG5vE46BSDKwBvXQcctjDEDUkGBqadKfFyvECoTF5uVwg3NizpoCEg43YJ2ACsJmkobmvsNPirnFCkY19h8FWe8fp3X2T4f4tTVeeSE3wQr6JqffZjZ4b5qzTYWLvtXoB9z5sqaJ3HoQthEvQzExByj2PLvuNGFcPZeMy7DStysnmZVb1WJhWGwA4374iQpR5Vi7Sa6yQyFhRbv2ZFE66PXziH4AKgKTQs3CKikV7cwwq5LqktFFoonr2g9EPz536zcBka4rdan6SbrVo2gTzgYDusJRjU9Yf9XRscMmx6nt246wDvVCrHdBdukCyiajzngKkJrQY9SMfh7VHhq34YtVjS6dDtLqCJmw6vnhFvjspTSoJ8czZjsadfcnki7B7fJbBjPY6iL8fFSyZtsHdu21NQxttqCQiBGk1mFj1ohwTr7a3rCLpHsn8yyaJ66iGXHruBX2CZeL61gX8wuDM',
      },
      MsgEncoding.base58
    );
    await signer.sign(message, derivation);

    expect(message.signedTransaction.sig).toBe(
      '4CtKVtgpCE4HfDkaWs74L3ZCbVCHzy2Qwy4pzjRoXEX4TYhZQCfNiWoSEdiJtfYg2g9aK5YvYpEe1229tLW3HMYt'
    );
  });

  it('should get a private key', async () => {
    expect(await signer.getPrivateKey(derivation)).toEqual(privateKey);
  });

  it('should return signature for solana message', async () => {
    const message = provider.createMsg({
      data: '726eSG6YzuM2gGVRSbGZptsMzM17zPZP5KAv8GM96CxdtDX4BkZBVV4JbRQgrdGs83mqFBPh2j7XiFsQVhskmq7cEd3TS561e1VPTw84Z9LnXPTxJHZTgucPkmmUrDQTgtGeYMw1BiKyHYg4j9aPAULMwihHVvmjMzYwVKQVqr3PNMeYcLcw8oYNWkWfBddzoL2gJL8W8pAHGhrV46F3me4hJLxU59VU1GBKThv6LHo5frUcS3j15YFkWVaFipVQeoemiKQgjfL3q21ziEkaA8LvvoFfJmaXfAKAoyhKhrzWTzDzfk1t2UPX5qxgzXy5K7Qcst6hG1w3MSTtEbenDDLjNgmrspFw83hNftzeU2pdKQ2wjwjCAnLgzSLZBtrLNUcU9fqf5EbXYernV8qtZvRxChnzvt7ekyoyuDktVY8rk3JJDGNoyMqDF9zkrrA625eUWjSC9fedgfBACys1Q8gjBj3ET1qrj5Q9ZAst1yQtwKhzuC3tfJBtevjRByu9dgLVhW4n76DbgEPgSDjqwsGEymP6gtfbFJT8ZhhyW8yrxKASv44zkpEo3EqQuVFjteDHs3GtpP4qoMQwYHQbomccPtcv2KoDCLj45ueRsF4gsQS8QgVWS664zgPvBBqKdHqxA4gmuQpH7kL6T3w3BiTRGCZ4zZMHWbbssiDfrouYsxGJ518FfL7pMPiDvzGiJsAiDzU7mnpJpc52SmREH3ahjqf4DEiBMhorrjxKYPJ6KB5KuZv8BVmmpDgsdkt1wPbNBjJK13qmGzaueW9GVb7W1kq8wRCMhRqb6uHuofRMGZ9awcN5TKKeSCGaN68H2mHKMWbzgj7CVLAHstgTWcaqEauHxnTjfZT7njnA3WjG5vE46BSDKwBvXQcctjDEDUkGBqadKfFyvECoTF5uVwg3NizpoCEg43YJ2ACsJmkobmvsNPirnFCkY19h8FWe8fp3X2T4f4tTVeeSE3wQr6JqffZjZ4b5qzTYWLvtXoB9z5sqaJ3HoQthEvQzExByj2PLvuNGFcPZeMy7DStysnmZVb1WJhWGwA4374iQpR5Vi7Sa6yQyFhRbv2ZFE66PXziH4AKgKTQs3CKikV7cwwq5LqktFFoonr2g9EPz536zcBka4rdan6SbrVo2gTzgYDusJRjU9Yf9XRscMmx6nt246wDvVCrHdBdukCyiajzngKkJrQY9SMfh7VHhq34YtVjS6dDtLqCJmw6vnhFvjspTSoJ8czZjsadfcnki7B7fJbBjPY6iL8fFSyZtsHdu21NQxttqCQiBGk1mFj1ohwTr7a3rCLpHsn8yyaJ66iGXHruBX2CZeL61gX8wuDM',
    });
    const signature = await signer.signMessage(message, derivation);
    expect(signature).toEqual({
      pubKey: 'C2J2ZbD3E41B6ZwufDcsbTHFrLhAoN6bHTBZjWd5DiU5',
      sig: 'LvYxkcdz3E2NmhwAX2EAnPgudhaWyGRkxkNdEu7ZnPaBcyU4giu8VjCM7TMyYPmVn2rsvJvWfYpmhLK5HL7GPiE',
    });
  });

  it('should return a tx with multiple signatures', async () => {
    const alice = new SeedPhraseSigner(
      'question unusual episode tree fresh lawn enforce vocal attitude quarter solutioni shove early arch topic'
    );
    const bob = new SeedPhraseSigner(
      'access before split cram spoon snap secret month sphere fog embark donor early arch topic'
    );

    const aliceKeyPair = Keypair.fromSecretKey(
      Buffer.from(await alice.getPrivateKey(derivation), 'hex')
    );

    const bobKeyPair = Keypair.fromSecretKey(
      Buffer.from(await bob.getPrivateKey(derivation), 'hex')
    );

    const alicePublickey = new PublicKey(
      bs58.decode(await alice.getAddress(derivation))
    );
    const bobPublickey = new PublicKey(
      bs58.decode(await bob.getAddress(derivation))
    );

    // const { blockhash, lastValidBlockHeight } =
    //   await provider.rpcProvider.getLatestBlockhash('finalized');

    // Create a transaction need multisign
    const transaction = new SolanaTransaction({
      blockhash: 'DHMZ9b8KE6XrsyiE1YzQUV9GfaxFjqXrpo2ZL3YG4KJE',
      lastValidBlockHeight: 256032877,
      feePayer: alicePublickey, // Alice pays the transaction fee
    });
    // Transfer 0.01 SOL
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: alicePublickey,
        toPubkey: bobPublickey,
        lamports: 10000000,
      })
    );
    // Transfer 0.02 SOL
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: bobPublickey,
        toPubkey: alicePublickey,
        lamports: 20000000,
      })
    );
    const serializedTx = transaction.serialize({
      requireAllSignatures: false,
    });

    // Using solana web3 lib
    const testTransaction = SolanaTransaction.from(serializedTx);
    testTransaction.partialSign(aliceKeyPair);

    // Using chain-lib
    const msg = provider.createMsg(
      {
        data: serializedTx.toString('base64'),
      },
      MsgEncoding.base64
    );

    // Sign with Alice
    await alice.sign(msg as ChainMsg, derivation);
    expect(testTransaction.signatures[0].publicKey.toBase58()).toEqual(
      msg.signedTransaction.pubKey
    );
    expect(Buffer.from(bs58.decode(msg.signedTransaction.sig))).toEqual(
      testTransaction.signatures[0].signature
    );

    // Send signed transations to Bob
    const msgContainAliceSignature = provider.createMsg(
      {
        data: testTransaction
          .serialize({
            requireAllSignatures: false,
          })
          .toString('base64'),
      },
      MsgEncoding.base64
    );

    // Sign with Bob
    testTransaction.partialSign(bobKeyPair);
    await bob.sign(msgContainAliceSignature as ChainMsg, derivation);
    expect(testTransaction.signatures[1].publicKey.toBase58()).toEqual(
      msgContainAliceSignature.signedTransaction.pubKey
    );
    expect(
      Buffer.from(bs58.decode(msgContainAliceSignature.signedTransaction.sig))
    ).toEqual(testTransaction.signatures[1].signature);
  });
});

describe('seed-phase.addressGeneration', () => {
  let derivation: (index: number) => string;
  let seedPhrase: string;
  let signer: SeedPhraseSigner;
  let firstAddress: string;
  let secondAddress: string;

  beforeEach(() => {
    seedPhrase =
      'access before split cram spoon snap secret month sphere fog embark donor';
    derivation = (index) => `m/44'/501'/${index}'/0'`;
    signer = new SeedPhraseSigner(seedPhrase);

    firstAddress = '4ddtNdH4V2Rvwvzkg8nrMMNjauxB4fAjMk8JS5VYnHGi';
    secondAddress = 'AgSByikto3D5ZN5EimEBxfLT73qwbB4rTs7Ep7ZSLtRk';
  });

  it('should get an address from the seed phrase', async () => {
    expect(await signer.getAddress(derivation(0))).toBe(firstAddress);
  });

  it('should get the second address form the seed phrase', async () => {
    expect(await signer.getAddress(derivation(1))).toBe(secondAddress);
  });
});
