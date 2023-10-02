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
import { Chain } from '@xdefi-tech/chains-core';
import {
  ChainsContext,
  initDefaultProviders,
  restoreProviders,
  saveProviders,
} from '../context/chains.context';
import BalancesComponent from '../components/balances.component';
import TransactionsComponent from '../components/transactions.component';
import BroadcastComponent from '../components/broadcast.component';

const Home: NextPage = () => {
  const chains = useContext(ChainsContext);

  const [currentProvider, setCurrentProvider] = useState<
    undefined | Chain.Provider
  >(chains.getProviderList()[0]);
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
  }, [chains]);

  if (!currentProvider) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h3" my={3}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-testid="xdefiWalletIcon"
        >
          <path
            d="M4.31095 5.42062C4.20124 5.31075 4.20124 5.13261 4.31095 5.02274L5.02368 4.30898C5.13339 4.19911 5.31127 4.19911 5.42098 4.30898L7.57673 6.46787C7.68644 6.57774 7.68644 6.75588 7.57673 6.86575L6.86401 7.57952C6.75429 7.68939 6.57642 7.68939 6.46671 7.57952L4.31095 5.42062Z"
            fill="white"
          ></path>
          <path
            d="M8.42228 9.53195C8.31257 9.42208 8.31257 9.24394 8.42228 9.13407L9.13501 8.4203C9.24472 8.31043 9.42259 8.31043 9.5323 8.4203L11.6881 10.5792C11.7978 10.6891 11.7978 10.8672 11.6881 10.9771L10.9753 11.6908C10.8656 11.8007 10.6877 11.8007 10.578 11.6908L8.42228 9.53195Z"
            fill="white"
          ></path>
          <path
            d="M10.5787 4.30929C10.6884 4.19942 10.8663 4.19942 10.976 4.30929L11.6887 5.02305C11.7984 5.13293 11.7984 5.31106 11.6887 5.42093L9.53296 7.57983C9.42325 7.6897 9.24538 7.6897 9.13567 7.57983L8.42294 6.86606C8.31323 6.75619 8.31323 6.57806 8.42294 6.46819L10.5787 4.30929Z"
            fill="white"
          ></path>
          <path
            d="M6.46639 8.41964C6.5761 8.30977 6.75398 8.30977 6.86369 8.41964L7.57641 9.13341C7.68612 9.24328 7.68612 9.42141 7.57641 9.53128L5.42066 11.6902C5.31095 11.8001 5.13307 11.8001 5.02336 11.6902L4.31064 10.9764C4.20093 10.8665 4.20093 10.6884 4.31064 10.5785L6.46639 8.41964Z"
            fill="white"
          ></path>
          <path
            opacity="0.2"
            d="M4.31095 13.6423C4.20124 13.5324 4.20124 13.3543 4.31095 13.2444L5.02368 12.5307C5.13339 12.4208 5.31126 12.4208 5.42098 12.5307L7.57673 14.6896C7.68644 14.7994 7.68644 14.9776 7.57673 15.0874L6.864 15.8012C6.75429 15.9111 6.57642 15.9111 6.46671 15.8012L4.31095 13.6423Z"
            fill="#969DA3"
          ></path>
          <path
            opacity="0.2"
            d="M12.5356 5.42062C12.4259 5.31075 12.4259 5.13261 12.5356 5.02274L13.2483 4.30898C13.358 4.19911 13.5359 4.19911 13.6456 4.30898L15.8013 6.46787C15.9111 6.57774 15.9111 6.75588 15.8013 6.86575L15.0886 7.57952C14.9789 7.68939 14.801 7.68939 14.6913 7.57952L12.5356 5.42062Z"
            fill="#969DA3"
          ></path>
          <path
            opacity="0.2"
            d="M8.42326 1.31027C8.31355 1.2004 8.31355 1.02226 8.42326 0.91239L9.13598 0.198625C9.24569 0.0887542 9.42357 0.0887543 9.53328 0.198625L11.689 2.35752C11.7987 2.46739 11.7987 2.64553 11.689 2.7554L10.9763 3.46916C10.8666 3.57904 10.6887 3.57904 10.579 3.46916L8.42326 1.31027Z"
            fill="#969DA3"
          ></path>
          <path
            opacity="0.2"
            d="M0.198649 9.53878C0.0889383 9.42891 0.088938 9.25078 0.198649 9.14091L0.911374 8.42714C1.02108 8.31727 1.19896 8.31727 1.30867 8.42714L3.46443 10.586C3.57414 10.6959 3.57414 10.874 3.46443 10.9839L2.7517 11.6977C2.64199 11.8076 2.46411 11.8076 2.3544 11.6977L0.198649 9.53878Z"
            fill="#969DA3"
          ></path>
          <path
            opacity="0.2"
            d="M10.5787 12.531C10.6884 12.4211 10.8663 12.4211 10.976 12.531L11.6887 13.2447C11.7984 13.3546 11.7984 13.5327 11.6887 13.6426L9.53296 15.8015C9.42325 15.9114 9.24538 15.9114 9.13567 15.8015L8.42294 15.0877C8.31323 14.9779 8.31323 14.7997 8.42294 14.6899L10.5787 12.531Z"
            fill="#969DA3"
          ></path>
          <path
            opacity="0.2"
            d="M2.35409 4.30929C2.4638 4.19942 2.64167 4.19942 2.75138 4.30929L3.46411 5.02305C3.57382 5.13293 3.57382 5.31106 3.46411 5.42093L1.30835 7.57983C1.19864 7.6897 1.02077 7.6897 0.911057 7.57983L0.198331 6.86606C0.0886209 6.75619 0.088621 6.57806 0.198332 6.46819L2.35409 4.30929Z"
            fill="#969DA3"
          ></path>
          <path
            opacity="0.2"
            d="M6.46737 0.198939C6.57708 0.0890679 6.75495 0.0890677 6.86466 0.198938L7.57739 0.912703C7.6871 1.02257 7.6871 1.20071 7.57739 1.31058L5.42164 3.46948C5.31193 3.57935 5.13405 3.57935 5.02434 3.46948L4.31161 2.75571C4.2019 2.64584 4.2019 2.46771 4.31161 2.35784L6.46737 0.198939Z"
            fill="#969DA3"
          ></path>
          <path
            opacity="0.2"
            d="M14.691 8.42745C14.8007 8.31758 14.9786 8.31758 15.0883 8.42745L15.801 9.14122C15.9107 9.25109 15.9107 9.42922 15.801 9.53909L13.6453 11.698C13.5356 11.8079 13.3577 11.8079 13.248 11.698L12.5352 10.9842C12.4255 10.8744 12.4255 10.6962 12.5352 10.5864L14.691 8.42745Z"
            fill="#969DA3"
          ></path>
        </svg>
        <span style={{ marginLeft: '10px' }}>XDEFI Playground</span>
      </Typography>

      <Typography variant="h4" my={3}>
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
            <MenuItem value={provider.id} key={provider.id}>
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

      <BroadcastComponent provider={currentProvider} />
    </Container>
  );
};

export default Home;
