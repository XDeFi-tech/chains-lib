import { METADATA_KEY as INV_METADATA_KEY } from 'inversify';
import * as OWN_METADATA_KEY from './metadata';

export const CHAIN_SCOPE_NAME = 'CHAIN';

export const SIGNER_SCOPE_NAME = 'SIGNER';

const METADATA_KEY = { ...INV_METADATA_KEY, ...OWN_METADATA_KEY };

export { METADATA_KEY };
