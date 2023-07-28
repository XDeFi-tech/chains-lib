import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Chain, Transaction } from '@xdefi-tech/chains-core';

export interface ITransactionsComponent {
  provider: Chain.Provider;
  address: string;
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
    <Box>
      <Typography variant="h4">Transactions</Typography>

      <Button
        onClick={handleTransactionsClick}
        disabled={transactionsLoader || Boolean(transactionsError)}
      >
        Set Transactions
      </Button>

      {transactionsError && (
        <Typography color="red">{transactionsError}</Typography>
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
        {transactions.map((tx: any) => {
          const data = tx.data;
          const fee = {
            value: data.fee.value / (10 ** data.fee.asset.decimals),
            price: data.fee.value / (10 ** data.fee.asset.decimals) * data.fee.asset.price.amount,
            symbol: data.fee.asset.symbol,
          }
            return (
                <ListItem button key={data.hash}>
                    <Typography>{data.timestamp}</Typography>
                    <Typography mx={2}>{data.status}</Typography>
                    <Typography width={200} sx={{ wordBreak: 'break-all' }}>{data.hash}</Typography>
                    <ListItemText
                      primary={`${fee.value} ${fee.symbol}`}
                      secondary={`${fee.price}$`}
                      sx={{ textAlign: 'end', maxWidth: '100px', margin: '0 16px' }}
                    />
                    <Box>
                      <Typography>Messages</Typography>
                      {data.msgs.map((m, i) => (
                        <Box key={i}>
                          <Typography>From: {m.from}</Typography>
                          <Typography>To: {m.to}</Typography>
                          <Typography>Amount: {m.amount / (10 ** m.asset.decimals)} {m.asset.symbol}</Typography>
                        </Box>
                      ))}
                    </Box>
                </ListItem>
            )
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

export default TransactionsComponent;
