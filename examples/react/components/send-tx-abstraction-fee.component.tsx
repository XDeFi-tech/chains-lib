import React, { useState } from 'react';
import {
  CosmosProvider,
  ChainMsg,
  COSMOS_MANIFESTS,
  IndexerDataSource,
  TxData,
  MsgBody,
  CosmosChainType,
} from '@xdefi-tech/chains-cosmos';
import { SeedPhraseSigner } from '@xdefi-tech/chains-cosmos/dist/signers/web';
import { GasFeeSpeed } from '@xdefi-tech/chains-core';

const provider = new CosmosProvider(
  new IndexerDataSource(COSMOS_MANIFESTS.osmosis)
);

const TransferForm = () => {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [denom, setDenom] = useState('');

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDenomChange = (e) => {
    setDenom(e.target.value);
  };

  const handleSend = async () => {
    const signer = new SeedPhraseSigner('YOUR_SEED_PHRASE');
    const derivation = "m/44'/118'/0'/0/0";
    const txInput: MsgBody = {
      from: 'osmo1txd2s5ulx6fetq8qhx0u8mkhhk2rh5cv2fzyw9',
      to: 'osmo1txd2s5ulx6fetq8qhx0u8mkhhk2rh5cv2fzyw9',
      amount,
      denom,
      feeOptions: {
        gasAdjustment: 1,
        gasFee: {
          denom,
        },
      },
    };
    const transferMsg = provider.createMsg(txInput);
    const [estimationFee] = await provider.estimateFee(
      [transferMsg],
      GasFeeSpeed.low
    );
    console.log('🚀 ~ handleSend ~ estimationFee:', estimationFee);
    const estimateAbstractionFee = await provider.calculateFeeAbs(
      estimationFee,
      denom
    );
    console.log(
      '🚀 ~ handleSend ~ estimateAbstractionFee:',
      estimateAbstractionFee
    );
    // const txInputWithAbsFee = {
    //   ...txInput,
    //   ...estimateAbstractionFee,
    //   from: await signer.getAddress(derivation, 'osmo'),
    // };
    // const newTransferMsg = provider.createMsg(txInputWithAbsFee);
    // await signer.sign(newTransferMsg as ChainMsg, derivation);
    // console.log('🚀 ~ handleSend ~ newTransferMsg - after:', newTransferMsg);
    // await provider.broadcast([newTransferMsg as ChainMsg]);
    // console.log('🚀 ~ handleSend ~ tx:', txInput);
    // setTo('');
    // setAmount('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={handleToChange}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={handleAmountChange}
      />
      <input
        type="text"
        placeholder="Denom IBC"
        value={denom}
        onChange={handleDenomChange}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default TransferForm;
