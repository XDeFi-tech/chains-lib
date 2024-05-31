import { useEffect, useState } from 'react';
import {
  COSMOS_MANIFESTS,
  ChainMsg,
  CosmosProvider,
  IndexerDataSource,
} from '@xdefi-tech/chains-cosmos';
import { SeedPhraseSigner } from '@xdefi-tech/chains-cosmos/dist/signers/web';
import { GasFeeSpeed } from '@xdefi-tech/chains-core';

const IBCTokenTranfer = () => {
  const [sourceChain, setSourceChain] = useState('osmosis');
  const [destChain, setDestChain] = useState('akash');
  const [amount, setAmount] = useState('1');
  const [denomSource, setDenomSource] = useState(
    'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2'
  );
  const [denomDest, setDenomDest] = useState(
    'ibc/2E5D0AC026AC1AFA65A23023BA4F24BB8DDF94F118EDC0BAD6F625BFC557CDED'
  );
  const [route, setRoute] = useState(null);
  const [msgBody, setMsgBody] = useState(null);
  const [chainMsg, setChainMsg] = useState(null);

  const [userAddresses, setUserAddresses] = useState([]);

  const signer = new SeedPhraseSigner('YOUR_SEED_PHASE');
  const derivations = "m/44'/118'/0'/0/0";

  useEffect(() => {
    const fetchRoute = async () => {
      const { getIBCTransferRouter } = CosmosProvider.utils;
      // const { destAssetDenom, decimals } = await getIBCDestAsset(
      //   sourceChain,
      //   destChain,
      //   denomSource
      // );
      // setDenomDest(destAssetDenom);
      const route = await getIBCTransferRouter(
        (Number(amount) * 10 ** 6).toString(),
        denomSource,
        sourceChain as any,
        denomDest,
        destChain as any
      );
      setRoute(route);
      setUserAddresses([]);
    };
    fetchRoute();
  }, [denomSource, denomDest, amount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'source':
        setSourceChain(value);
        break;
      case 'dest':
        setDestChain(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      case 'denom':
        setDenomSource(value);
        break;
      case 'destDenom':
        setDenomDest(value);
        break;
      default:
        break;
    }
  };

  const handleInputAddress = (index, event) => {
    const newUserAddresses = [...userAddresses];
    newUserAddresses[index] = event.target.value;
    setUserAddresses(newUserAddresses);
  };

  const handleCreateMsg = async () => {
    const { createIBCTransferMsg } = await CosmosProvider.utils;
    const msgBody = await createIBCTransferMsg(route, userAddresses);
    setMsgBody(msgBody);
  };

  const handleEstimateGas = async () => {
    const provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS[sourceChain])
    );
    const message = provider.createMsg(msgBody);
    const gas = await provider.estimateFee(
      [message as ChainMsg],
      GasFeeSpeed.low
    );
    console.log('🚀 ~ handleEstimateGas ~ gas:', gas);
    setMsgBody({ ...msgBody, ...gas[0] });
  };

  const handleSign = async () => {
    const provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS[sourceChain])
    );
    const message = provider.createMsg(msgBody);
    await signer.sign(message as ChainMsg, derivations);
    console.log('🚀 ~ handleSign ~ message:', message);
    setChainMsg(message);
  };

  const handleBroadcast = async () => {
    const provider = new CosmosProvider(
      new IndexerDataSource(COSMOS_MANIFESTS[sourceChain])
    );
    const tx = await provider.broadcast([chainMsg]);
    console.log('🚀 ~ handleBroadcast ~ tx:', tx);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple Input Form</h1>
      <div>
        <label>
          Source:
          <input
            type="text"
            name="source"
            value={sourceChain}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Dest:
          <input
            type="text"
            name="dest"
            value={destChain}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="text"
            name="amount"
            value={amount}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Denom Source:
          <input
            type="text"
            name="denom"
            value={denomSource}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Denom Dest:
          <input
            type="text"
            name="destDenom"
            value={denomDest}
            onChange={handleChange}
          />
        </label>
      </div>
      {route && (
        <div>
          <label>User Addresses</label>
          {route.chain_ids.map((chain, index) => (
            <div key={index}>
              <label>
                {chain.charAt(0).toUpperCase() + chain.slice(1)}:
                <input
                  type="text"
                  value={userAddresses[index]}
                  onChange={(e) => handleInputAddress(index, e)}
                  placeholder={`Enter ${chain} value`}
                />
              </label>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => handleCreateMsg()}>Create Msg</button>
        <button onClick={() => handleEstimateGas()}>Estimate Gas</button>
        <button onClick={() => handleSign()}>Sign Msg</button>
        <button onClick={() => handleBroadcast()}>Broadcast</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <div>Denom Source: {denomSource}</div>
        <div>Denom Dest: {denomDest}</div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <div>
          Route: <pre>{JSON.stringify(route, null, 2)}</pre>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <div>
          MsgBody: <pre>{JSON.stringify(msgBody, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default IBCTokenTranfer;
