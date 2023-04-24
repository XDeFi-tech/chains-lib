'use clients';
import React, { useCallback, useState, useContext, useEffect } from 'react';
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
import { ChainsContext, initDefaultProviders, restoreProviders, saveProviders } from '../context/chains.context';
import BalancesComponent from '../components/balances.component';
import TransactionsComponent from '../components/transactions.component';

const Home: NextPage = () => {
  const chains = useContext(ChainsContext);

  const [currentProvider, setCurrentProvider] = useState<
    undefined | Chain.Provider
  >(chains.getProviderList()[0] || undefined);
  const handleChainChange = useCallback(
    (event) => {
      setCurrentProvider(chains.getProviderById(event.target.value));
    },
    [chains]
  );

  const [address, setAddress] = useState<string>('');
  const handleAddressChange = useCallback(
    (event) => setAddress(event.target.value),
    []
  );

  useEffect(() => {
    const list = chains.getProviderList();
    if (list.length > 0) {
      return;
    }

    const restored = restoreProviders();
    if (!restored) {
      initDefaultProviders();
      saveProviders();
    }
    setCurrentProvider(chains.getProviderList()[0]);
  }, [chains])

  if (!currentProvider) {
    return null;
  }

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
          value={currentProvider.id}
          label="Available chains"
          onChange={handleChainChange}
        >
          {chains.getProviderList().map((provider) => (
            <MenuItem
              value={provider.id}
              key={provider.id}
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
