import { utils } from 'near-api-js';
export const DEFAULT_GAS = utils.format.parseNearAmount('0.00083') as string;
// account creation costs 0.00125 NEAR for storage, 0.00000000003 NEAR for gas
// https://docs.near.org/docs/api/naj-cookbook#wrap-and-unwrap-near
export const FT_MINIMUM_STORAGE_BALANCE = utils.format.parseNearAmount(
  '0.00125'
) as string;
export const FT_MINIMUM_STORAGE_BALANCE_LARGE = utils.format.parseNearAmount(
  '0.0125'
) as string;
export const FT_STORAGE_DEPOSIT_GAS = utils.format.parseNearAmount(
  '0.00000000003'
) as string;
export const FT_TRANSFER_GAS = utils.format.parseNearAmount(
  '0.00000000003'
) as string;
export const FT_TRANSFER_DEPOSIT = '1';
