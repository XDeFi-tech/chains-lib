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
  const [chain, setChain] = useState('solana');
  const [data, setData] = useState('');
  const [derivedPath, setDerivedPath] = useState("m/84'/2'/0'/0/0");

  const connectLedger = async () => {
    try {
      const transport = await Transport.create();
      let signer;
      if (chain === 'litecoin') {
        setDerivedPath("m/84'/2'/0'/0/0");
        signer = new LitecoinLedgerSigner(transport as any);
        setAddress(await signer.getAddress("m/84'/2'/0'/0/0", 'bech32'));
      } else if (chain === 'bitcoin') {
        setDerivedPath("m/84'/0'/0'/0/0");
        signer = new BitcoinLedgerSigner(transport as any);
        setAddress(await signer.getAddress("m/84'/0'/0'/0/0", 'bech32'));
      } else if (chain === 'thor') {
        setDerivedPath("m/44'/931'/0'/0/0");
        signer = new ThorLedgerSigner(transport as any);
        setAddress(await signer.getAddress("44'/931'/0'/0/0"));
      } else if (chain === 'solana') {
        setDerivedPath("44'/501'/0'/0'");
        signer = new SolanaLedgerSigner(transport as any);
        setAddress(await signer.getAddress("44'/501'/0'/0'"));
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
      data !== ''
        ? provider.createMsg(
            {
              from: address,
              to: toAddress,
              amount: 0,
              data: data,
            },
            MsgEncoding.base58
          )
        : asset === ''
        ? provider.createMsg({
            from: address,
            to: toAddress,
            amount: amount,
          })
        : provider.createMsg({
            from: address,
            to: address,
            amount: amount,
            denom: asset,
            type: MsgType.MsgDeposit,
            memo: '=:GAIA.ATOM:cosmos1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn0cwydm:0/1/0:t:30', // TODO: change this to the actual memo
          });
    if (signer) {
      await signer.sign(msg, derivedPath);
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
            <option value="thor">Thor</option>
            <option value="solana">Solana</option>
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
              Asset:
              <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
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
