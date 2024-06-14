'use clients';
import React, { useCallback, useState } from 'react';
import type { NextPage } from 'next';
import { Container, Typography, TextField, Box } from '@mui/material';
import { PrivateKeySigner } from '@xdefi-tech/chains-evm/dist/signers/web';
import {
  EvmProvider,
  IndexerDataSource,
  EVM_MANIFESTS,
} from '@xdefi-tech/chains-evm';

const SignerPage: NextPage = () => {
  const [pk, setPk] = useState('');
  const [address, setAddress] = useState('');
  const provider = new EvmProvider(
    new IndexerDataSource(EVM_MANIFESTS.ethereum),
    { signers: [PrivateKeySigner] }
  );

  const handleGetAddress = useCallback((event) => {
    setPk(event.target.value);
    const SignerProvider = provider.getSigners()[0];
    const signer = new SignerProvider(event.target.value);
    signer
      .getAddress('')
      .then((res) => setAddress(res))
      .catch((error) => setAddress(''));
  }, []);

  return (
    <Container>
      <Box my={2}>
        <TextField
          id="pk"
          label="Private key"
          variant="outlined"
          value={pk}
          onChange={handleGetAddress}
          fullWidth
        />
      </Box>

      <Typography variant="h4" my={3}>
        Current chain: {address}
      </Typography>
    </Container>
  );
};

export default SignerPage;
