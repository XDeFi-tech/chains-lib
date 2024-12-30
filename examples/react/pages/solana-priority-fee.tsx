import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';
import { SOLANA_MANIFEST, SolanaProvider } from '@xdefi-tech/chains-solana';
import { PrivateKeySigner } from '@xdefi-tech/chains-solana/dist/signers/react-native';
import { Coin, MsgEncoding } from '@xdefi-tech/chains-core';

export default function SolanaPriorityFee() {
  const [privateKey, setPrivateKey] = useState('');
  const [address, setAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [data, setData] = useState('');
  const [encoding, setEncoding] = useState<MsgEncoding>(MsgEncoding.object);
  const [gasLimit, setGasLimit] = useState('');
  const [gasPrice, setGasPrice] = useState('');
  const [txHash, setTxHash] = useState('');
  const [signer, setSigner] = useState<PrivateKeySigner | null>(null);
  const provider = new SolanaProvider(
    new SolanaProvider.dataSourceList.IndexerDataSource(SOLANA_MANIFEST)
  );
  const [balance, setBalance] = useState<Coin[] | null>(null);

  const handlePrivateKeySubmit = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      const signer = new PrivateKeySigner(privateKey);
      setSigner(signer);
      const address = await signer.getAddress('');
      setAddress(address);
    }
  };

  const createMsg = () => {
    return provider.createMsg(
      {
        from: address,
        to: toAddress == '' ? undefined : toAddress,
        amount: amount == '' ? 0 : amount,
        contractAddress: contractAddress == '' ? undefined : contractAddress,
        data: data == '' ? undefined : data,
        gasLimit: gasLimit == '' ? undefined : gasLimit,
        gasPrice: gasPrice == '' ? undefined : gasPrice,
      },
      encoding
    );
  };

  const handleEstimatePriorityFee = async () => {
    const msg = createMsg();
    console.log('🚀 ~ handleEstimatePriorityFee ~ msg:', msg);
    const fee = await provider.estimateFee([msg]);
    setGasLimit(fee[0].gasLimit.toString());
    setGasPrice(fee[0].gasPrice.toString());
  };

  const handleSignAndBroadcast = async () => {
    const msg = createMsg();
    await signer?.sign(msg);
    const [tx] = await provider.broadcast([msg]);
    setTxHash(tx.data.hash);
  };

  useEffect(() => {
    const getBalance = async () => {
      if (!address) {
        setBalance(null);
        return;
      }
      const balance = await provider.getBalance(address);
      const data = await balance.getData();
      setBalance(data);
    };
    getBalance();
  }, [address]);

  const calculateMaxAmount = async () => {
    const msg = createMsg();
    const maxAmount = await msg.getMaxAmountToSend();
    if (Number(maxAmount) > 0) {
      setAmount(maxAmount.toString());
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            type="password"
            label="Private Key"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            onKeyPress={handlePrivateKeySubmit}
            sx={{ mb: 2 }}
          />
        </Box>

        {balance && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxHeight: 200,
              overflowY: 'auto',
              mb: 3,
            }}
          >
            <Typography>Balance:</Typography>
            {balance.map((coin, index) => (
              <Typography key={index}>
                {coin.asset.symbol}: {coin.amount.toString()} (
                {coin.asset.address})
              </Typography>
            ))}
          </Box>
        )}

        {address && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField fullWidth label="From" value={address} disabled />

            <TextField
              fullWidth
              label="To"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />

            <TextField
              fullWidth
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Button
              variant="outlined"
              onClick={calculateMaxAmount}
              sx={{ ml: 1 }}
            >
              Max
            </Button>

            <TextField
              fullWidth
              label="Contract Address"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
            />

            <TextField
              fullWidth
              label="Data"
              multiline
              rows={3}
              value={data}
              onChange={(e) => setData(e.target.value)}
            />

            <Select
              fullWidth
              value={encoding}
              onChange={(e) => setEncoding(e.target.value)}
            >
              <MenuItem value={MsgEncoding.object}>Object</MenuItem>
              <MenuItem value={MsgEncoding.base64}>Base64</MenuItem>
              <MenuItem value={MsgEncoding.base58}>Base58</MenuItem>
            </Select>

            <Button
              variant="contained"
              onClick={handleEstimatePriorityFee}
              sx={{ mt: 1 }}
            >
              Estimate Priority Fee
            </Button>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Gas Limit"
                value={gasLimit}
                sx={{ flex: 1 }}
                onChange={(e) => setGasLimit(e.target.value)}
              />
              <TextField
                label="Gas Price"
                value={gasPrice}
                sx={{ flex: 1 }}
                onChange={(e) => setGasPrice(e.target.value)}
              />
            </Box>

            <Button
              variant="contained"
              onClick={handleSignAndBroadcast}
              sx={{ mt: 1 }}
            >
              Sign & Broadcast
            </Button>

            {txHash && (
              <Typography sx={{ mt: 2, wordBreak: 'break-all' }}>
                Transaction Hash: {txHash}
              </Typography>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}
