import { BITCOIN_MANIFEST, BitcoinProvider } from '@xdefi-tech/chains-bitcoin';
import { TrezorSigner as BitcoinTrezorSigner } from '@xdefi-tech/chains-bitcoin/dist/signers/web';
import {
  BITCOINCASH_MANIFEST,
  BitcoinCashProvider,
} from '@xdefi-tech/chains-bitcoincash';
import { TrezorSigner as BitcoinCashTrezorSigner } from '@xdefi-tech/chains-bitcoincash/dist/signers/web';
import {
  DOGECOIN_MANIFEST,
  DogecoinProvider,
} from '@xdefi-tech/chains-dogecoin';
import { TrezorSigner as DogecoinTrezorSigner } from '@xdefi-tech/chains-dogecoin/dist/signers/web';
import { EVM_MANIFESTS, EvmProvider, TokenType } from '@xdefi-tech/chains-evm';
import { TrezorSigner as EvmTrezorSigner } from '@xdefi-tech/chains-evm/dist/signers/web';
import {
  LITECOIN_MANIFEST,
  LitecoinProvider,
} from '@xdefi-tech/chains-litecoin';
import { TrezorSigner as LitecoinTrezorSigner } from '@xdefi-tech/chains-litecoin/dist/signers/web';
import React, { useEffect, useState } from 'react';
import TrezorConnect from '@trezor/connect-web';

const TrezorPage = () => {
  const [chain, setChain] = useState('ethereum');
  const [provider, setProvider] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState(null);
  const [signer, setSigner] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState('');
  const [type, setType] = useState('');
  const [decimals, setDecimals] = useState(18);
  const [derivationPath, setDerivationPath] = useState("m/44'/60'/0'/0/0");

  const chains = [
    ...Object.keys(EVM_MANIFESTS),
    'bitcoin',
    'bitcoincash',
    'litecoin',
    'dogecoin',
  ];

  //   useEffect(() => {
  //     TrezorConnect.init({
  //       manifest: {
  //         appUrl: 'localhost',
  //         email: 'user@example.com',
  //       },
  //     });
  //     TrezorConnect.getAddress({
  //       path: "m/84'/2'/0'/0/0",
  //       coin: 'ltc',
  //     }).then(console.log);
  //   }, []);

  useEffect(() => {
    let initProvider, initSigner;
    switch (chain) {
      case 'bitcoin':
        initProvider = new BitcoinProvider(
          new BitcoinProvider.dataSourceList.IndexerDataSource(BITCOIN_MANIFEST)
        );
        setProvider(initProvider);
        initSigner = new BitcoinTrezorSigner();
        setSigner(initSigner);
        setDerivationPath("m/84'/0'/0'/0/0");
        setIsConnected(false);
        break;
      case 'bitcoincash':
        initProvider = new BitcoinCashProvider(
          new BitcoinCashProvider.dataSourceList.IndexerDataSource(
            BITCOINCASH_MANIFEST
          )
        );
        setProvider(initProvider);
        initSigner = new BitcoinCashTrezorSigner();
        setSigner(initSigner);
        setDerivationPath("m/44'/145'/0'/0/0");
        setIsConnected(false);
        break;
      case 'litecoin':
        initProvider = new LitecoinProvider(
          new LitecoinProvider.dataSourceList.IndexerDataSource(
            LITECOIN_MANIFEST
          )
        );
        setProvider(initProvider);
        initSigner = new LitecoinTrezorSigner();
        setSigner(initSigner);
        setDerivationPath("m/84'/2'/0'/0/0");
        setIsConnected(false);
        break;
      case 'dogecoin':
        initProvider = new DogecoinProvider(
          new DogecoinProvider.dataSourceList.IndexerDataSource(
            DOGECOIN_MANIFEST
          )
        );
        setProvider(initProvider);
        initSigner = new DogecoinTrezorSigner();
        setSigner(initSigner);
        setDerivationPath("m/44'/3'/0'/0/0");
        setIsConnected(false);
        break;
      default:
        initProvider = new EvmProvider(
          new EvmProvider.dataSourceList.IndexerDataSource(EVM_MANIFESTS[chain])
        );
        setProvider(initProvider);
        initSigner = new EvmTrezorSigner();
        setSigner(initSigner);
        setIsConnected(false);
    }
  }, [chain]);

  useEffect(() => {
    const getBalance = async () => {
      if (fromAddress !== '') {
        const balances = await provider.getBalance(fromAddress);
        console.log('🚀 ~ getBalance ~ balance:', await balances.getData());
        setBalance(await balances.getData());
      }
    };
    getBalance();
  }, [fromAddress]);

  const handleConnect = async () => {
    if (signer) {
      await signer.initTrezor('example@test.com', 'localhost');
      const address = await signer.getAddress(derivationPath);
      console.log('🚀 ~ handleConnect ~ address:', address);
      setFromAddress(address);
      setIsConnected(EvmTrezorSigner.getInstance().initialized);
    }
  };

  const handleConfirm = async () => {
    if (toAddress !== '' && amount !== '') {
      const msg = provider.createMsg({
        from: fromAddress,
        to: toAddress,
        amount,
        contractAddress: contract !== '' ? contract : undefined,
        tokenType: type !== '' ? type : undefined,
        decimals,
      });
      console.log('🚀 ~ handleConfirm ~ msg:', msg);

      await signer.sign(msg, derivationPath);
      console.log(msg.signedTransaction);
      const txs = await provider.broadcast([msg]);
      console.log('🚀 ~ handleConfirm ~ txs:', txs);
      setTxHash(txs[0].data.hash);
    }
  };

  return (
    <div>
      <h1>Trezor Test</h1>
      <select onChange={(e) => setChain(e.target.value)} value={chain}>
        {chains.map((chain) => (
          <option key={chain} value={chain}>
            {chain}
          </option>
        ))}
      </select>
      <button onClick={handleConnect} disabled={!chain}>
        Connect Trezor
      </button>
      {isConnected && (
        <div>
          <p>Connected to Trezor! Address: {fromAddress}</p>
          <h3>Balances</h3>
          {balance &&
            balance.map((e) => (
              <p key={e.asset.symbol}>
                {e.asset.symbol}: {e.amount.toString()}
              </p>
            ))}
          <h3>Create Transaction</h3>
          <input
            type="text"
            placeholder="To Address"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contract Address"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
          />
          <input
            type="number"
            placeholder="Decimals"
            value={decimals}
            onChange={(e) => setDecimals(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      )}
      {txHash && <p>Transaction Hash: {txHash}</p>}
    </div>
  );
};

export default TrezorPage;
