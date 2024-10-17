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

import {
  ThorProvider,
  THORCHAIN_MANIFESTS,
  MsgType,
} from '@xdefi-tech/chains-thor';
import { LedgerSigner as ThorLedgerSigner } from '@xdefi-tech/chains-thor/dist/signers/web';
import { LedgerSigner as SolanaLedgerSigner } from '@xdefi-tech/chains-solana/dist/signers/web';
import { SOLANA_MANIFEST, SolanaProvider } from '@xdefi-tech/chains-solana';
import { MsgEncoding } from '@xdefi-tech/chains-core';
import Solana from '@ledgerhq/hw-app-solana';
import { base58 } from 'ethers/lib/utils';

const LedgerConnect = () => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [asset, setAsset] = useState('');
  const [chain, setChain] = useState('litecoin');
  const [data, setData] = useState('');
  const [memo, setMemo] = useState('');
  const [derivedPath, setDerivedPath] = useState("m/84'/2'/0'/0/0");

  const getAddressType = (derivedPath: string) => {
    if (derivedPath.startsWith("m/44'")) {
      return 'legacy';
    } else if (derivedPath.startsWith("m/49'")) {
      return 'p2sh';
    } else if (derivedPath.startsWith("m/84'")) {
      return 'bech32';
    } else if (derivedPath.startsWith("m/86'")) {
      return 'bech32m';
    }
  };
  const connectLedger = async () => {
    try {
      const transport = await Transport.create();
      let signer;
      if (chain === 'litecoin') {
        signer = new LitecoinLedgerSigner(transport as any);
        setAddress(
          await signer.getAddress(derivedPath, getAddressType(derivedPath))
        );
      } else if (chain === 'bitcoin') {
        signer = new BitcoinLedgerSigner(transport as any);
        console.log('🚀 ~ connectLedger ~ derivedPath:', derivedPath);
        console.log(
          '🚀 ~ connectLedger ~ getAddressType(derivedPath):',
          getAddressType(derivedPath)
        );
        setAddress(
          await signer.getAddress(derivedPath, getAddressType(derivedPath))
        );
      } else if (chain === 'thor') {
        signer = new ThorLedgerSigner(transport as any);
        setAddress(await signer.getAddress(derivedPath));
      } else if (chain === 'solana') {
        signer = new SolanaLedgerSigner(transport as any);
        setAddress(await signer.getAddress(derivedPath));
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
    } else if (chain === 'thor') {
      provider = new ThorProvider(
        new ThorProvider.dataSourceList.IndexerDataSource(
          THORCHAIN_MANIFESTS.thorchain
        )
      );
    } else if (chain === 'solana') {
      provider = new SolanaProvider(
        new SolanaProvider.dataSourceList.IndexerDataSource(SOLANA_MANIFEST)
      );
    }
    const msg =
      chain === 'solana' && data !== ''
        ? provider.createMsg(
            {
              from: address,
              to: toAddress,
              amount: 0,
              data: data,
            },
            MsgEncoding.base58
          )
        : memo === ''
        ? provider.createMsg({
            from: address,
            to: toAddress,
            amount: amount,
            denom: asset,
            decimals: 8,
          })
        : provider.createMsg({
            from: address,
            to: address,
            amount: amount,
            denom: asset,
            type: MsgType.MsgDeposit,
            memo: memo,
          });
    console.log('🚀 ~ handleConfirm ~ msg:', msg);
    if (signer) {
      await signer.sign(msg, derivedPath);
      console.log(msg.signedTransaction);
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
            <option value="thor">Thor</option>
            <option value="solana">Solana</option>
          </select>
        </label>
        <br />
        <label>
          Derivation Path:
          <input
            type="text"
            value={derivedPath}
            onChange={(e) => setDerivedPath(e.target.value)}
          />
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
          <div>
            <label>
              Asset:
              <input
                type="text"
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Data:
              <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Memo:
              <input
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
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
