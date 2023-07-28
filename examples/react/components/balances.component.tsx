import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Coin, Chain } from '@xdefi-tech/chains-core';
import { isEmpty } from 'lodash';

export interface IBalancesComponent {
  provider: Chain.Provider;
  address: string;
}

const BalancesComponent = (props: IBalancesComponent) => {
  const [balances, setBalances] = useState<Coin[]>([]);
  const [balanceError, setBalanceError] = useState<null | string>(null);
  const [balanceLoader, setBalanceLoader] = useState<boolean>(false);
  const [subscription, setSubscription] = useState(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    handleUnsubscribe();
  }, [props.address, props.provider]);

  useEffect(() => {
    setBalanceError(null);
  }, [props.address]);

  const handleUnsubscribe = useCallback(() => {
    if (subscription) {
      subscription.unsubscribe();
      setSubscription(null);
    }
    setBalanceError(null);
  }, [subscription]);

  const handleBalanceClick = useCallback(async () => {
    try {
      setBalanceLoader(true);
      setBalanceError(null);
      const balanceResponse = await props.provider.getBalance(props.address);
      const balanceData = await balanceResponse.getData();

      setLastUpdate(new Date());
      setBalances(balanceData);
      setBalanceLoader(false);
    } catch (err) {
      setBalanceError(err.message);
      setBalanceLoader(false);
    }
  }, [props.address, props.provider]);

  const handleStreamingClick = useCallback(async () => {
    try {
      if (subscription) {
        handleUnsubscribe();
        return;
      }
      if (isEmpty(balances)) {
        await handleBalanceClick();
      }
      const balanceResponse = await props.provider.getBalance(props.address);
      const balanceObserver = await balanceResponse.getObserver();

      setSubscription(
        balanceObserver.subscribe((data) => {
          // todo create and update subs list
          console.log('subscription data', data);
        })
      );
    } catch (err) {
      setBalanceError(err.message);
      setSubscription(null);
    }
  }, [balances, subscription, props.address, props.provider]);

  return (
    <Box>
      <Typography variant="h4">Balances</Typography>

      <Box>
        <Button
          onClick={handleBalanceClick}
          disabled={balanceLoader || Boolean(balanceError)}
        >
          Set Balances
        </Button>
        <Button
          onClick={handleStreamingClick}
          disabled={balanceLoader || Boolean(balanceError)}
        >
          {subscription ? 'Disable' : 'Enable'} Stream
        </Button>
      </Box>

      {balanceError && <Typography color="red">{balanceError}</Typography>}

      {lastUpdate && (
        <Typography color="gray">
          {lastUpdate.toDateString()} {lastUpdate.toTimeString()}
        </Typography>
      )}

      <List
        component="div"
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          maxHeight: 500,
          overflow: 'auto',
        }}
      >
        {balances.map((coin: Coin) => {
          const priceInUsd = coin.asset.price ? `${coin.amount.multipliedBy(coin.asset.price).toFixed(2)}$` : 'N/A'
          return (
            <ListItem button key={coin.asset.id || coin.asset.symbol}>
              <ListItemAvatar>
                <img
                  width="30"
                  height="30"
                  src={coin.asset.icon}
                  alt={coin.asset.symbol}
                />
              </ListItemAvatar>
              <Typography>{coin.asset.symbol}</Typography>
              <ListItemText
                primary={coin.amount.toFixed(8)}
                secondary={priceInUsd}
                sx={{ textAlign: 'end' }}
              />
            </ListItem>
          );
        })}
      </List>

      <Divider
        sx={{
          borderWidth: 3,
          my: 3,
          borderRadius: 10,
        }}
      />
    </Box>
  );
};

export default BalancesComponent;
