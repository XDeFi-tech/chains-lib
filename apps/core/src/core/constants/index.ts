import { METADATA_KEY as INV_METADATA_KEY } from 'inversify';
import * as OWN_METADATA_KEY from './metadata';

const METADATA_KEY = { ...INV_METADATA_KEY, ...OWN_METADATA_KEY };

export { METADATA_KEY };
