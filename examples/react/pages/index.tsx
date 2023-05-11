'use clients';
import React, { useCallback, useState, useContext } from 'react';
import type { NextPage } from 'next';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from '@mui/material';
import { Chain } from '@xdefi/chains-core';
import { ChainsContext } from '../context/chains.context';
import BalancesComponent from '../components/balances.component';
import TransactionsComponent from '../components/transactions.component';

const Home: NextPage = () => {
  const chains = useContext(ChainsContext);

  const [currentProvider, setCurrentProvider] = useState<
    undefined | Chain.Provider
  >(chains.getProviderByType('Cosmos')[0]);
  const handleChainChange = useCallback(
    (event) => {
      setCurrentProvider(chains.getProviderByChain(event.target.value));
    },
    [chains]
  );

  const [address, setAddress] = useState<string>(
    'cosmos1ze2ye5u5k3qdlexvt2e0nn0508p04094j0vmx8'
  );
  const handleAddressChange = useCallback(
    (event) => setAddress(event.target.value),
    []
  );

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

      <BalancesComponent provider={currentProvider} address={address} />

      <TransactionsComponent provider={currentProvider} address={address} />
    </Container>
  );
};

export default Home;
