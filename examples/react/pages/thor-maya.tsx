import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import {
  ChainsContext,
  initDefaultProviders,
  restoreProviders,
  saveProviders,
} from '../context/chains.context';
import { GasFeeSpeed, MsgEncoding } from '@xdefi-tech/chains-core';
import {
  IndexerDataSource,
  MsgType,
  THORCHAIN_MANIFESTS,
  ThorProvider,
} from '@xdefi-tech/chains-thor';
import { PrivateKeySigner } from '@xdefi-tech/chains-thor/dist/signers/web';

const provider = new ThorProvider(
  new IndexerDataSource(THORCHAIN_MANIFESTS.thorchain)
);

const Thor = () => {
  const chains = useContext(ChainsContext);
  console.log('🚀 ~ Thor ~ chains:', chains);
  const [thorProvider, setThorProvider] = useState<undefined | ThorProvider>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = (values) => {
    const errors: { [key: string]: string } = {};
    if (!values.sender) {
      errors.sender = 'Sender address is required';
    } else if (!ThorProvider.verifyAddress(values.sender, 'thor')) {
      errors.sender = 'Invalid sender address';
    }

    if (!values.recipient) {
      errors.recipient = 'Recipient address is required';
    } else if (!ThorProvider.verifyAddress(values.recipient, 'thor')) {
      errors.recipient = 'Invalid recipient address';
    }

    if (!values.amount) {
      errors.amount = 'Amount is required';
    } else if (isNaN(values.amount) || Number(values.amount) <= 0) {
      errors.amount = 'Amount must be a positive number';
    }

    if (!values.denom) {
      errors.denom = 'Token denomination is required';
    }

    if (!values.privateKey) {
      errors.privateKey = 'Private key is required';
    } else if (values.privateKey?.length != 64) {
      errors.privateKey = 'Invalid private key';
    }

    return errors;
  };
  useEffect(() => {
    try {
      const list = chains.getProviderList();
      if (list.length > 0) {
        return;
      }

      const restored = restoreProviders();
      if (!restored) {
        initDefaultProviders();
        saveProviders();
      }
      setThorProvider(chains.getProviderById('thor') as ThorProvider);
    } catch (error) {}
  }, [chains]);

  const onFinish = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = new FormData(event.currentTarget);
    const values = {
      sender: data.get('sender'),
      recipient: data.get('recipient'),
      amount: data.get('amount'),
      denom: data.get('denom'),
      publicKey: data.get('publicKey'),
      privateKey: data.get('privateKey'),
      memo: data.get('memo'),
    };
    const errors = validateForm(values);
    console.log('🚀 ~ onFinish ~ errors:', errors);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    } else {
      setFormErrors({});
    }
    try {
      const { sender, recipient, amount, denom, privateKey, memo } = values;
      console.log(
        '🚀 ~ onFinish ~ { sender, recipient, amount, denom, privateKey }:',
        { sender, recipient, amount, denom, privateKey }
      );
      const signer = new PrivateKeySigner(String(privateKey));
      // Create the deposit message
      const msgBody = {
        type: MsgType.MsgDeposit,
        from: String(sender),
        to: String(recipient),
        amount: String(amount),
        denom: String(denom),
        memo: String(memo),
      };
      const depositMsg = provider.createMsg(msgBody);

      const tx = await depositMsg.buildTx();
      console.log('🚀 ~ onFinish ~ tx:', tx);
      const depositBody = depositMsg.buildDepositBody();
      console.log('🚀 ~ onFinish ~ depositBody:', depositBody);
      await signer.sign(depositMsg);
      console.log('🚀 ~ onFinish ~ depositMsg:', depositMsg.signedTransaction);
      // const gasFee = await depositMsg.getFee();
      try {
        const fee = await provider.estimateFee(
          [depositMsg],
          GasFeeSpeed.medium
        );
        console.log('🚀 ~ onFinish ~ gasFee:', fee);
      } catch (error) {
        console.log('🚀 ~ onFinish ~ gasFee ~ error:', error);
      }

      try {
        // Broadcast the transaction
        const transactions = await provider.broadcast([depositMsg]);
        console.log('🚀 ~ onFinish ~ transactions:', transactions[0].data.hash);
      } catch (error) {
        console.log('🚀 ~ onFinish ~ transaction ~ error:', error);
      }

      // notification.success({
      //   message: 'Transaction Successful',
      //   description: `Transaction Hash: ${transactions[0]?.toData().hash}`,
      // });
    } catch (error) {
      //   notification.error({
      //     message: 'Transaction Failed',
      //     description: error.message,
      //   });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Thor/Maya Deposit Transaction
        </Typography>
        <form onSubmit={onFinish}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="sender"
            label="Sender Address"
            name="sender"
            defaultValue={'thor1qgtjg3r9cf5xj4vvntdn9rv824dne3ngy7jllv'}
            autoComplete="sender"
            autoFocus
            error={!!formErrors.sender}
            helperText={formErrors.sender}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="recipient"
            label="Recipient Address"
            name="recipient"
            defaultValue={'thor1qgtjg3r9cf5xj4vvntdn9rv824dne3ngy7jllv'}
            autoComplete="recipient"
            error={!!formErrors.recipient}
            helperText={formErrors.recipient}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Amount"
            name="amount"
            defaultValue={'10'}
            autoComplete="amount"
            error={!!formErrors.amount}
            helperText={formErrors.amount}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="denom"
            label="Token Denomination"
            name="denom"
            defaultValue={'THOR.RUNE'}
            autoComplete="denom"
            error={!!formErrors.denom}
            helperText={formErrors.denom}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="memo"
            label="memo"
            name="memo"
            defaultValue={
              '=:GAIA.ATOM:cosmos1nvt0fx864yyuyjvpw7eh2uj5zudcfkcn0cwydm:0/1/0:t:30'
            }
            type="text"
            autoComplete="memo"
            error={!!formErrors.memo}
            helperText={formErrors.memo}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="privateKey"
            label="Private Key"
            name="privateKey"
            type="password"
            autoComplete="privateKey"
            error={!!formErrors.privateKey}
            helperText={formErrors.privateKey}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </form>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </Box>
    </Container>
  );
};

export default Thor;
