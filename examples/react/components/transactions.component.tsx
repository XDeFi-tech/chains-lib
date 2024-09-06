import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, Button, List, ListItem } from '@mui/material';
import { Chain, Transaction } from '@xdefi-tech/chains-core';

import HowToContainer from './containers/how-to.container';

export interface ITransactionsComponent {
  provider: Chain.Provider;
  address: string;
  children?: React.ReactNode;
}

const TransactionsComponent = (props: ITransactionsComponent) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsError, setTransactionsError] = useState<null | string>(
    null
  );
  const [transactionsLoader, setTransactionsLoader] = useState<boolean>(false);

  useEffect(() => {
    setTransactionsError(null);
  }, [props.address]);

  const handleTransactionsClick = useCallback(async () => {
    try {
      setTransactionsLoader(true);
      setTransactionsError(null);
      const transactionsResponse = await props.provider.getTransactions(
        props.address
      );
      const transactionsData = await transactionsResponse.getData();
      setTransactions(transactionsData);
      setTransactionsLoader(false);
    } catch (err) {
      console.error(err);
      setTransactionsLoader(false);
      setTransactionsError(err.message);
    }
  }, [props.address, props.provider]);

  return (
    <Box sx={{ marginTop: '1em' }}>
      <Typography variant="h6">Transactions</Typography>

      <Button
        onClick={handleTransactionsClick}
        disabled={transactionsLoader || Boolean(transactionsError)}
      >
        Set Transactions
      </Button>

      {transactionsError && (
        <Typography color="red">{transactionsError}</Typography>
      )}

      {transactions.length > 0 && (
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
          {transactions.map((tx: any) => {
            return (
              <ListItem button key={tx.data.hash}>
                <Typography variant="body1">
                  {JSON.stringify(tx.data)}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      )}

      <HowToContainer title="get transactions?">
        {props.children}
      </HowToContainer>
    </Box>
  );
};

export default TransactionsComponent;
