import React, { useCallback, useState, useEffect } from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Coin } from '@xdefi/chains-core';
import { useChains } from './hooks/useChains';

const Home: NextPage = () => {
  const { chains } = useChains();
  const [balanceInput, setBalanceInput] = useState('0x90b0d2d51464efefb38aad00f954649cb5d16040');
  // const [balanceInput, setBalanceInput] = useState('MDQp6XevB6jH1FCwZNB2bKshYrPic1sQ7M');
  const [balance, setBalance] = useState<Coin[] | null>(null);

  useEffect(() => {
    console.log('LOG type', chains.getProviderList());
    getGasFeeOptions();
  }, [])

  const getGasFeeOptions = useCallback(async () => {
    const provider = chains.getProviderByChain('ethereum');
    const options = await provider.gasFeeOptions();
    console.log('LOG GAS FEE', options);
  }, [])

  const getBalance = useCallback(async () => {
    const balance = await chains.getProviderByChain('ethereum').getBalance(balanceInput);

    setBalance(balance)
  }, [balanceInput, chains])

  // const getTransactions = useCallback(async () => {
  //   const transactions = await chains.getProviderByChain('ethereum').getTransactions(balanceInput);
  //
  //   console.log('LOG transactions', transactions);
  // }, [balanceInput])

  const getManifest = useCallback(async () => {
    const manifest = chains.getProviderByChain('ethereum').manifest;

    console.log('LOG manifest', manifest)
  }, [chains])

  const createMsg = useCallback(async (data: any) => {
    const msg = chains.getProviderByChain('ethereum').createMsg(data);

    msg.sign('sign');

    const txs = await chains.getProviderByChain('ethereum').broadcast([msg]);
  }, [chains])

  const handleInput = useCallback((event: any) => {
    setBalanceInput(event.target.value)
  }, [])


  return (
      <div className={styles.container}>
        <div>
          <div className={styles.block}>
            <h4>Balance</h4>
            <div className={styles.inputBlock}>
              <input style={{flex: 1}} type="text" value={balanceInput} onInput={handleInput}/>
              <button onClick={getBalance}>Get balance</button>
            </div>

            {balance &&
                <div>
                  <p>{JSON.stringify(balance)}</p>
                </div>
            }
          </div>
        </div>
      </div>
  )
}

export default Home
