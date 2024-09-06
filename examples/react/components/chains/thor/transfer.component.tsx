import React from 'react';
import {
  Box,
  FormControl,
  OutlinedInput,
  InputLabel,
  Typography,
  Button,
} from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export interface ITransferComponent {
  address: string;
  provider: any;
  signer: any;
  derivation: string;
}

const TransferComponent = (props: ITransferComponent) => {
  /* Collect data */
  const [fromAddress, setFromAddress] = React.useState<string>(props.address);
  const [toAddress, setToAddress] = React.useState<string>(props.address);
  const [amount, setAmount] = React.useState<string>('0.1');
  const [decimals, setDecimals] = React.useState<string>(
    props.provider.manifest.decimals
  );
  const [denom, setDenom] = React.useState<string>(
    props.provider.manifest.denom
  );
  const [derivation, setDerivation] = React.useState<string>(props.derivation);

  React.useEffect(() => {
    setFromAddress(props.address);
    setToAddress(props.address);
  }, [props.address]);

  React.useEffect(() => {
    setDerivation(props.derivation);
  }, [props.derivation]);

  const handleInputChange = React.useCallback(
    (func: any) => (event) => {
      setTxLoading(false);
      setTxError(null);
      func(event.target.value);
    },
    []
  );

  /* Send transaction flow */
  const [txHash, setTxHash] = React.useState<string>('');
  const [txLoading, setTxLoading] = React.useState<boolean>(false);
  const [txError, setTxError] = React.useState<string | null>(null);

  const handleSendTransaction = React.useCallback(async () => {
    try {
      setTxLoading(true);
      const msg = props.provider.createMsg({
        from: fromAddress,
        to: toAddress,
        amount,
        decimals,
        ...(denom && { denom }),
      });
      await props.signer.sign(msg, props.derivation);
      const [tx] = await props.provider.broadcast([msg]);
      setTxHash(tx.data.hash);
      setTxLoading(false);
    } catch (err) {
      console.error(err);
      setTxError(err.message);
      setTxLoading(false);
    }
  }, [fromAddress, toAddress, amount, decimals, denom]);

  return (
    <Box sx={{ marginTop: '1em' }}>
      <Typography variant="h6">Transfer (MsgSend)</Typography>

      <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
        <InputLabel htmlFor="transfer-from-address">From Address</InputLabel>
        <OutlinedInput
          id="transfer-from-address"
          value={fromAddress}
          onChange={handleInputChange(setFromAddress)}
          label="From address"
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
        <InputLabel htmlFor="transfer-to-address">To Address</InputLabel>
        <OutlinedInput
          id="transfer-to-address"
          value={toAddress}
          onChange={handleInputChange(setToAddress)}
          label="To address"
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
        <InputLabel htmlFor="transfer-amount">Amount</InputLabel>
        <OutlinedInput
          id="transfer-amount"
          value={amount}
          onChange={handleInputChange(setAmount)}
          label="Amount"
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
        <InputLabel htmlFor="transfer-decimals">Decimals</InputLabel>
        <OutlinedInput
          id="transfer-decimals"
          value={decimals}
          onChange={handleInputChange(setDecimals)}
          label="Decimals"
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
        <InputLabel htmlFor="transfer-denom">Denom</InputLabel>
        <OutlinedInput
          id="transfer-denom"
          value={denom}
          onChange={handleInputChange(setDenom)}
          label="Denom"
        />
      </FormControl>

      <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
        <InputLabel htmlFor="transfer-derivation">Derivation</InputLabel>
        <OutlinedInput
          id="transfer-derivation"
          value={derivation}
          onChange={handleInputChange(setDerivation)}
          label="Derivation"
        />
      </FormControl>

      <SyntaxHighlighter
        language="typescript"
        style={dracula}
        showLineNumbers="true"
        customStyle={{ marginBottom: '1em' }}
      >
        {`import { ThorProvider, THORCHAIN_MANIFESTS } from '@xdefi-tech/chains-thor';
import { SeedPhraseSigner } from '@xdefi-tech/chains-thor/dist/signers/web';

const provider = new ThorProvider(
  new ThorProvider.dataSourceList.IndexerDataSource(THORCHAIN_MANIFESTS.${
    props.provider.manifest.chain
  })
);
const signer = new SeedPhraseSigner('YOUR_SEED_PHRASE');
const msg = provider.createMsg({
  from: '${fromAddress}',
  to: '${toAddress}',
  amount: '${amount}',
  ${decimals && `decimals: '${decimals}',`}
  ${denom && `denom: '${denom}',`}
});
await signer.sign(msg, "${derivation}");
console.log(msg.signedTransaction); // signed transaction
const [tx] = await provider.broadcast([msg]);
console.log(tx.data.hash); // transaction hash`}
      </SyntaxHighlighter>
      {txError && <Typography color="error">{txError}</Typography>}
      {txHash && <Typography>Transaction hash: {txHash}</Typography>}

      <Button onClick={handleSendTransaction} disabled={txLoading || txError}>
        Send transction
      </Button>
    </Box>
  );
};

export default TransferComponent;
