import React, { useCallback, useState, useEffect } from 'react';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { EvmProvider, evmManifests, XdefiRepository } from '@xdefi/chains-evm';
import { Coin, ConfigProvider } from '@xdefi/chains-core';

const Home: NextPage = () => {
  const [currentProvider, setCurrentProvider] = useState(
      new EvmProvider(new XdefiRepository(evmManifests.ethereum))
  );
  const [balanceInput, setBalanceInput] = useState('0x90b0d2d51464efefb38aad00f954649cb5d16040');
  // const [balanceInput, setBalanceInput] = useState('MDQp6XevB6jH1FCwZNB2bKshYrPic1sQ7M');
  const [balance, setBalance] = useState<Coin[] | null>(null);

  useEffect(() => {
    console.log('LOG type', currentProvider.providerName);
  }, [])

  const getBalance = useCallback(async () => {
    const balance = await currentProvider.getBalance(balanceInput);

    setBalance(balance)
  }, [balanceInput])

  const getTransactions = useCallback(async () => {
    const transactions = await currentProvider.getTransactions(balanceInput);

    console.log('LOG transactions', transactions);
  }, [balanceInput])

  const getManifest = useCallback(async () => {
    const manifest = currentProvider.manifest;

    console.log('LOG manifest', manifest)
  }, [balanceInput])

  const createMsg = useCallback(async (data: any) => {
    const msg = currentProvider.createMsg(data);

    msg.sign('sign');

    const txs = await currentProvider.broadcast([msg]);
  }, [])

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