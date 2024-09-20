import React, { useState } from 'react';
import Transport from '@ledgerhq/hw-transport-webhid';
import { LedgerSigner as LitecoinLedgerSigner } from '@xdefi-tech/chains-litecoin/dist/signers/web';
import {
  IndexerDataSource as LitecoinIndexerDataSource,
  LITECOIN_MANIFEST,
  LitecoinProvider,
} from '@xdefi-tech/chains-litecoin';

import {
  BitcoinProvider,
  BITCOIN_MANIFEST,
  IndexerDataSource as BitcoinIndexerDataSource,
  LedgerSigner as BitcoinLedgerSigner,
} from '@xdefi-tech/chains-bitcoin';

const LedgerConnect = () => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [chain, setChain] = useState('litecoin');

  const connectLedger = async () => {
    try {
      const transport = await Transport.create();
      console.log('🚀 ~ connectLedger ~ transport:', transport);
      let signer;
      if (chain === 'litecoin') {
        signer = new LitecoinLedgerSigner(transport as any);
        setAddress(await signer.getAddress("m/84'/2'/0'/0/0", 'bech32'));
      } else if (chain === 'bitcoin') {
        signer = new BitcoinLedgerSigner(transport as any);
        setAddress(await signer.getAddress("m/84'/0'/0'/0/0", 'bech32'));
      }
      setSigner(signer);
      setConnected(true);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(
        'Failed to connect to Ledger. Please make sure your device is connected and unlocked.'
      );
    }
  };

  const handleConfirm = async () => {
    let provider;
    if (chain === 'litecoin') {
      provider = new LitecoinProvider(
        new LitecoinIndexerDataSource(LITECOIN_MANIFEST)
      );
    } else if (chain === 'bitcoin') {
      provider = new BitcoinProvider(
        new BitcoinIndexerDataSource(BITCOIN_MANIFEST)
      );
    }
    const msg = provider.createMsg({
      from: address,
      to: toAddress,
      amount: amount,
    });
    if (signer) {
      await signer.sign(
        msg,
        chain === 'litecoin' ? "m/84'/2'/0'/0/0" : "m/84'/0'/0'/0/0"
      );
      console.log('🚀 ~ handleConfirm ~ signedTx:', msg.signedTransaction);
      const transaction = await provider.broadcast([msg]);
      console.log('🚀 ~ handleConfirm ~ transaction:', transaction);
    }
  };

  return (
    <div>
      <h1>Connect to Ledger Wallet</h1>
      <div>
        <label>
          Select Chain:
          <select value={chain} onChange={(e) => setChain(e.target.value)}>
            <option value="litecoin">Litecoin</option>
            <option value="bitcoin">Bitcoin</option>
          </select>
        </label>
      </div>
      {connected ? (
        <div>
          <p>Ledger connected successfully! Address: {address}</p>
          <div>
            <label>
              To Address:
              <input
                type="text"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </div>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      ) : (
        <button onClick={connectLedger}>Connect to Ledger</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LedgerConnect;
