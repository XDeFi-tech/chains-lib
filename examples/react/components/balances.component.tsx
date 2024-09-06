import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Coin, Chain } from '@xdefi-tech/chains-core';
import HowToContainer from './containers/how-to.container';

export interface IBalancesComponent {
  provider: Chain.Provider;
  address: string;
  tokenList: string[];
  children?: React.ReactNode;
}

const BalancesComponent = (props: IBalancesComponent) => {
  const [balances, setBalances] = useState<Coin[]>([]);
  const [balanceError, setBalanceError] = useState<null | string>(null);
  const [balanceLoader, setBalanceLoader] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    setBalanceError(null);
  }, [props.address]);

  const handleBalanceClick = useCallback(async () => {
    try {
      setBalanceLoader(true);
      setBalanceError(null);
      let balanceResponse;
      if (props.tokenList.length > 0) {
        balanceResponse = await props.provider.getBalance(
          props.address,
          props.tokenList
        );
      } else {
        balanceResponse = await props.provider.getBalance(props.address);
      }
      const balanceData = await balanceResponse.getData();
      setLastUpdate(new Date());
      setBalances(balanceData);
      setBalanceLoader(false);
    } catch (err) {
      setBalanceError(err.message);
      setBalanceLoader(false);
    }
  }, [props.address, props.provider, props.tokenList]);

  return (
    <Box>
      <Typography variant="h6">Balances</Typography>

      <Box>
        <Button
          onClick={handleBalanceClick}
          disabled={balanceLoader || Boolean(balanceError)}
        >
          Set Balances
        </Button>
      </Box>

      {balanceError && <Typography color="red">{balanceError}</Typography>}

      {balances.length > 0 && (
        <>
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
              marginBottom: '1em',
            }}
          >
            {balances.map((coin: Coin) => {
              const priceInUsd = coin.asset.price
                ? `${coin.amount.multipliedBy(coin.asset.price).toFixed(2)}$`
                : 'N/A';
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
        </>
      )}

      <HowToContainer title="get balances?">{props.children}</HowToContainer>
    </Box>
  );
};

export default BalancesComponent;
