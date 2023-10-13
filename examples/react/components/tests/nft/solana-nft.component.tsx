import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { SolanaProvider, SOLANA_MANIFEST } from '@xdefi-tech/chains-solana';
import WebSigners from '@xdefi-tech/chains-solana/web';

const SolanaNFTComponent = () => {
  const handleTestClick = useCallback(async () => {
    const provider = new SolanaProvider(new SolanaProvider.dataSourceList.IndexerDataSource(SOLANA_MANIFEST), { signers: WebSigners });
    const nfts = await provider.getNFTBalance('7wLVYNg3uNaaig6cqNrp5ZrurvJbUJQhcvU8FUnonCrB');

    console.log('NFTS', nfts);
  }, []);

  return (
    <Button
      variant="outlined"
      color="error"
      sx={{
        m: 5,
      }}
      onClick={handleTestClick}
    >
      SOLANA GET NFTS
    </Button>
  );
};

export default SolanaNFTComponent;
