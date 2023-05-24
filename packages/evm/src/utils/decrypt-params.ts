import { ethers } from 'ethers';

export const paramToString = (param: any, type: string) => {
  switch (type) {
    case 'address':
      return param;
    case 'uint256':
      return param.toString();
    case 'address[]':
      return param.join(`\n`);
    default:
      return String(param);
  }
};

export const decryptParams = (
  signature: { textSignature: string },
  abi: Array<any> | undefined,
  params: any
) => {
  const textSignature: string = signature?.textSignature || '';
  const funcType = textSignature?.split('(')[0] || '';
  const originalParams = (
    textSignature?.split('(')[1]?.split(')')[0] || ''
  ).split(',');
  const inputs = abi?.filter((f: any) => f.name === funcType)[0]?.inputs || [];
  let decodedParams: ethers.utils.Result = [];
  try {
    decodedParams = ethers.utils.defaultAbiCoder.decode(
      originalParams,
      ethers.utils.hexDataSlice(params.data, 4)
    );
  } catch (e) {
    console.error(e);
  }

  return {
    type: funcType,
    params: decodedParams.map((param, idx) => {
      return {
        uid: idx,
        name: inputs[idx]?.name || '',
        type: originalParams[idx],
        data: paramToString(param, originalParams[idx]),
      };
    }),
  };
};
