import React from 'react';
import { Box, FormControl, OutlinedInput, InputLabel } from '@mui/material';

import { ChainsContext } from '../../../context/chains.context';
import BalancesComponent from '../../balances.component';
import TransactionsComponent from '../../transactions.component';

import { registry } from '../../../constants/registry';
import TransferComponent from './transfer.component';

export interface IProviderContainer {
  seedPhrase: string;
  providerId: string;
}

const LitecoinProviderContainer = (props: IProviderContainer) => {
  const chains = React.useContext(ChainsContext);
  const provider = React.useMemo(() => {
    return chains.getProviderById(props.providerId);
  }, []);
  const signer = React.useMemo(() => {
    return new (provider.getSigners()[0])(props.seedPhrase);
  }, [provider]);
  const registryManifest = React.useMemo(() => {
    const item = registry.find((item) => item.id === props.providerId);
    if (!item) {
      console.log('Provider not found', props.providerId);
    }
    return item;
  }, []);

  const [address, setAddress] = React.useState<string>('');
  React.useEffect(() => {
    const getAddress = async () => {
      setAddress(
        await signer.getAddress(
          registryManifest.derivation[0].path,
          provider.manifest.prefix
        )
      );
    };
    getAddress();
  }, []);

  const handleAddressChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
    },
    []
  );

  return (
    <Box>
      <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
        <InputLabel htmlFor="balance-address">Address</InputLabel>
        <OutlinedInput
          id="balance-address"
          value={address}
          onChange={handleAddressChange}
          label="Seed phrase"
        />
      </FormControl>

      <BalancesComponent provider={provider} address={address} tokenList={[]}>
        {`const provider = new LitecoinProvider(
  new LitecoinProvider.dataSourceList.IndexerDataSource(LITECOIN_MANIFEST)
);
const balanceResponse = await provider.getBalance('${address}');
const balanceData = await balanceResponse.getData();
console.log(balanceData);`}
      </BalancesComponent>

      <TransactionsComponent provider={provider} address={address}>
        {`const provider = new LitecoinProvider(
  new LitecoinProvider.dataSourceList.IndexerDataSource(LITECOIN_MANIFEST)
);
const transactionsResponse = await provider.getTransactions('${address}');
const transactionsData = await transactionsResponse.getData();
console.log(transactionsData);`}
      </TransactionsComponent>

      <TransferComponent
        provider={provider}
        address={address}
        signer={signer}
        derivation={registryManifest.derivation[0].path}
      />
    </Box>
  );
};

export default LitecoinProviderContainer;
