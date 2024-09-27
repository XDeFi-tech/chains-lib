import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Chain, GasFeeSpeed, MsgEncoding } from '@ctrl-tech/chains-core';
import { PrivateKeySigner } from '@ctrl-tech/chains-binance/dist/signers/web';

export interface IBroadcastComponent {
  provider: Chain.Provider;
}

const SendTransaction = (props: IBroadcastComponent) => {
  const [pk, setPk] = useState<string>('');
  const [fromAddress, setFromAddress] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [speed, setSpeed] = useState<string>(GasFeeSpeed.medium);
  const [msg, setMsg] = useState(null);
  const [fee, setFee] = useState({
    fee: null,
    maxFee: null,
  });
  const [signedTx, setSignedTx] = useState('');
  const [hash, setHash] = useState('');
  useEffect(() => {
    if (!msg) {
      setFee({
        fee: null,
        maxFee: null,
      });
      return;
    }
    const getFee = async () => {
      const newFee = await msg.getFee();
      setFee(newFee);
    };
    getFee();
  }, [msg]);

  useEffect(() => {
    if (!pk) {
      return;
    }
    const getAddress = async () => {
      const signerInstance = new PrivateKeySigner(pk);
      const address = await signerInstance.getAddress();
      if (address) {
        setFromAddress(address);
      }
    };
    getAddress();
  }, [pk]);

  const handlePkChange = useCallback((event) => setPk(event.target.value), []);
  const handleToAddressChange = useCallback(
    (event) => setToAddress(event.target.value),
    []
  );
  const handleAmountChange = useCallback(
    (event) => setAmount(event.target.value),
    []
  );
  const handleSpeedChange = useCallback(
    (event) => setSpeed(event.target.value),
    []
  );

  const handleEstimateFee = useCallback(async () => {
    const msg = await props.provider.createMsg(
      {
        from: fromAddress,
        to: toAddress,
        amount: parseFloat(amount),
      },
      MsgEncoding.object
    );
    const [fee] = await props.provider.estimateFee([msg], speed as GasFeeSpeed);
    const msgWithFee = await props.provider.createMsg(
      {
        ...msg.toData(),
        ...fee,
      },
      MsgEncoding.object
    );
    setMsg(msgWithFee);
  }, [fromAddress, toAddress, amount, speed]);

  const handleSignTx = useCallback(async () => {
    if (!msg) {
      return;
    }
    const signerInstance = new PrivateKeySigner(pk);
    await signerInstance.sign(msg);
    if (msg.hasSignature) {
      setSignedTx(msg.signedTransaction);
    }
  }, [msg]);
  const handleBroadcast = useCallback(async () => {
    if (!msg) {
      return;
    }
    const [tx]: any = await props.provider.broadcast([msg]);
    console.log(tx);
    setHash(tx.data.txhash);
  }, [msg]);

  return (
    <Box sx={{ marginBottom: '200px' }}>
      <Typography variant="h4">SendTransaction</Typography>

      <Box my={2}>
        <TextField
          id="pk"
          label="Private key"
          variant="outlined"
          value={pk}
          onChange={handlePkChange}
          fullWidth
        />
      </Box>

      <Box my={2}>
        <TextField
          disabled
          id="from-address"
          label="From address"
          variant="outlined"
          value={fromAddress}
          fullWidth
        />
      </Box>

      <Box my={2}>
        <TextField
          id="to-address"
          label="To address"
          variant="outlined"
          value={toAddress}
          onChange={handleToAddressChange}
          fullWidth
        />
      </Box>

      <Box my={2}>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          value={amount}
          onChange={handleAmountChange}
          fullWidth
        />
      </Box>

      <Box my={2}>
        <Button onClick={handleEstimateFee}>Estimate Fee</Button>
        <FormControl>
          <InputLabel id="speed">Speed</InputLabel>
          <Select
            id="speed"
            size="small"
            value={speed}
            label="Speed"
            onChange={handleSpeedChange}
          >
            <MenuItem value={GasFeeSpeed.low}>Low</MenuItem>
            <MenuItem value={GasFeeSpeed.medium}>Medium</MenuItem>
            <MenuItem value={GasFeeSpeed.high}>High</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {msg && fee && fee.fee && (
        <Typography my={2}>Estimation fee: {fee.fee}$</Typography>
      )}

      {msg && fee && (
        <Button
          onClick={handleSignTx}
          sx={{
            margin: '0 16px',
          }}
        >
          Sign
        </Button>
      )}

      {signedTx && (
        <>
          <Typography my={2} sx={{ wordBreak: 'break-all' }}>
            Signed transaction: {signedTx}
          </Typography>
          <Button onClick={handleBroadcast}>Broadcast</Button>
        </>
      )}
      {hash && (
        <Typography my={2} sx={{ wordBreak: 'break-all' }}>
          TxHash: {hash}
        </Typography>
      )}
    </Box>
  );
};

export default SendTransaction;
