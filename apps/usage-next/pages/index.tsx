import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Coin, GasFeeSpeed, Signer } from '@xdefi/chains-core';
import { useChains } from './hooks/useChains';

const MOCK_TX_TYPE_ONE = {
    to: '0x76075A5997be82E39d9A3c8Eae660E74E1D9984B',
    from: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
    gasLimit: 21000,
    gasPrice: 20,
    data: '0x',
    value: '0.001',
    chainId: '1',
    type: 1,
};

const MOCK_TX_TYPE_TWO = {
    to: '0x76075A5997be82E39d9A3c8Eae660E74E1D9984B',
    from: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
    gasLimit: 21000,
    data: '0x',
    value: '0.001',
    chainId: '1',
    type: 2,
    maxPriorityFeePerGas: 0.24,
    maxFeePerGas: 25.34,
};

const Home: NextPage = () => {
    const { chains } = useChains();
    const [balanceInput, setBalanceInput] = useState(
        '0x90b0d2d51464efefb38aad00f954649cb5d16040'
    );
    // const [balanceInput, setBalanceInput] = useState('MDQp6XevB6jH1FCwZNB2bKshYrPic1sQ7M');
    const [balance, setBalance] = useState<Coin[] | null>(null);

    useEffect(() => {
        console.log('LOG type', chains.getProviderList());
        execTransaction();
    }, []);

    const execTransaction = useCallback(async () => {
        const provider = chains.getProviderByChain('ethereum');

        const [msg] = await provider.estimateFee(
            [
                provider.createMsg({
                    ...MOCK_TX_TYPE_TWO,
                }),
            ],
            GasFeeSpeed.medium
        );

        // console.log('LOG fee estimation', msg.feeEstimation.fee.toString());
        // console.log('LOG maxFee estimation', msg.feeEstimation.maxFee.toString());

        const msgData = msg.toData();

        const nonce = await provider.calculateNonce(msgData.from);

        const msgWithNonce = provider.createMsg({
            ...msgData,
            nonce: nonce,
        });

        const signer = provider.getSigner(Signer.SignerType.PRIVATE_KEY);
        const signature = await signer.sign(
            '0x6a3c408d267d27646fb251a3899f239004af956a9d7ba133d18364dbb1b4a588',
            msgWithNonce
        );
        msgWithNonce.sign(signature);

        // const tx = await provider.broadcast([msgWithNonce])
        // console.log(tx);
    }, []);

    const getBalance = useCallback(async () => {
        const balance = await chains
            .getProviderByChain('ethereum')
            .getBalance(balanceInput);

        setBalance(balance);
    }, [balanceInput, chains]);

    // const getTransactions = useCallback(async () => {
    //   const transactions = await chains.getProviderByChain('ethereum').getTransactions(balanceInput);
    //
    //   console.log('LOG transactions', transactions);
    // }, [balanceInput])

    const getManifest = useCallback(async () => {
        const manifest = chains.getProviderByChain('ethereum').manifest;

        console.log('LOG manifest', manifest);
    }, [chains]);

    const createMsg = useCallback(
        async (data: any) => {
            const msg = chains.getProviderByChain('ethereum').createMsg(data);

            msg.sign('sign');

            const txs = await chains.getProviderByChain('ethereum').broadcast([msg]);
        },
        [chains]
    );

    const handleInput = useCallback((event: any) => {
        setBalanceInput(event.target.value);
    }, []);

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.block}>
                    <h4>Balance</h4>
                    <div className={styles.inputBlock}>
                        <input
                            style={{ flex: 1 }}
                            type="text"
                            value={balanceInput}
                            onInput={handleInput}
                        />
                        <button onClick={getBalance}>Get balance</button>
                    </div>

                    {balance && (
                        <div>
                            <p>{JSON.stringify(balance)}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
