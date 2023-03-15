import React, { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import {
    Container,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Box,
} from '@mui/material'
import { ChainsContext } from '../context/chains.context'
import BalancesComponent from '../components/balances.component'
import TransactionsComponent from '../components/transactions.component'
import { TokenType } from '@xdefi/chains-evm/dist/msg'
import {
    Chain,
    Signer,
    SignerDecorator,
} from '@xdefi/chains-core'
import {
  IndexerDataSource,
  EvmProvider,
  EVM_MANIFESTS,
} from '@xdefi/chains-evm'

const MOCK_TX_TYPE_ONE = {
  to: '0x76075A5997be82E39d9A3c8Eae660E74E1D9984B',
  from: '0xD669fd4484d2C1fB2032B57a4C42AB4Cfb9395ff',
  gasLimit: 21000,
  gasPrice: 20,
  data: '0x',
  value: '0.001',
  chainId: '1',
  type: 1,
}

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
}

const Home: NextPage = () => {
    const chains = useContext(ChainsContext);

    const [currentProvider, setCurrentProvider] = useState<undefined | Chain.Provider>(chains.getProviderList()[0]);
    const handleChainChange = useCallback((event) => {
        setCurrentProvider(chains.getProviderByChain(event.target.value))
    }, [])

    const [address, setAddress] = useState<string>('');
    const handleAddressChange = useCallback((event) => setAddress(event.target.value), []);

    return (
        <Container>
            <Typography variant="h2" my={3}>
                Current chain: {currentProvider?.manifest.name}
            </Typography>

            <FormControl fullWidth>
                <InputLabel id="chains-list">Available chain</InputLabel>
                <Select
                    labelId="chains-list"
                    id="chains-list"
                    value={currentProvider.manifest.chain}
                    label="Available chains"
                    onChange={handleChainChange}
                >
                    {chains.getProviderList().map((provider) => (
                        <MenuItem
                            value={provider.manifest.chain}
                            key={provider.manifest.chain}
                        >
                            {provider.manifest.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box my={2}>
                <TextField
                    id="address"
                    label="Address"
                    variant="outlined"
                    value={address}
                    onChange={handleAddressChange}
                    fullWidth
                />
            </Box>

            <BalancesComponent
                provider={currentProvider}
                address={address}
            />

            <TransactionsComponent
                provider={currentProvider}
                address={address}
            />

        </Container>
    );
};

export default Home
