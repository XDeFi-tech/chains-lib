import React, { useState, useCallback, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
} from '@mui/material'
import { Chain, Transaction } from '@xdefi/chains-core'

export interface ITransactionsComponent {
  provider: Chain.Provider
  address: string
}
const TransactionsComponent = (props: ITransactionsComponent) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionsError, setTransactionsError] = useState<null | string>(
    null
  )
  const [transactionsLoader, setTransactionsLoader] = useState<boolean>(false)

  useEffect(() => {
    setTransactionsError(null)
  }, [props.address])

  const handleTransactionsClick = useCallback(async () => {
    try {
      setTransactionsLoader(true)
      setTransactionsError(null)
      const transactionsResponse = await props.provider.getTransactions(
        props.address
      )
      const transactionsData = await transactionsResponse.getData()
      setTransactions(transactionsData)
      setTransactionsLoader(false)
    } catch (err) {
      console.error(err)
      setTransactionsLoader(false)
      setTransactionsError(err.message)
    }
  }, [props.address, props.provider])

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
        {/*{transactions.map((coin: Transaction) => {*/}
        {/*    return (*/}
        {/*        <ListItem button key={coin.asset.id || coin.asset.symbol}>*/}
        {/*            <ListItemAvatar>*/}
        {/*                <img width="30" height="30" src={coin.asset.icon} alt={coin.asset.symbol} />*/}
        {/*            </ListItemAvatar>*/}
        {/*            <Typography>{coin.asset.symbol}</Typography>*/}
        {/*            <ListItemText*/}
        {/*                primary={coin.amount.toFixed(8)}*/}
        {/*                secondary={`${coin.amount.toFixed(8)}$`}*/}
        {/*                sx={{ textAlign: 'end' }}*/}
        {/*            />*/}
        {/*        </ListItem>*/}
        {/*    )*/}
        {/*})}*/}
      </List>

      <Divider
        sx={{
          borderWidth: 3,
          my: 3,
          borderRadius: 10,
        }}
      />
    </Box>
  )
}

export default TransactionsComponent
