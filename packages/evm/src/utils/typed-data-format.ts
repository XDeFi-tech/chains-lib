import {
  MessageTypes,
  SignTypedDataVersion,
  TypedDataUtils,
  TypedMessage,
} from '@metamask/eth-sig-util';

export const hashEIP712Message = (
  typedData: TypedMessage<MessageTypes>,
  version: SignTypedDataVersion.V3 | SignTypedDataVersion.V4
) => {
  const sanitizedData = TypedDataUtils.sanitizeData(typedData);
  const domain = TypedDataUtils.hashStruct(
    'EIP712Domain',
    sanitizedData.domain,
    sanitizedData.types,
    version
  );

  const message = TypedDataUtils.hashStruct(
    sanitizedData.primaryType as string,
    sanitizedData.message,
    sanitizedData.types,
    version
  );

  return { domain, message };
};
