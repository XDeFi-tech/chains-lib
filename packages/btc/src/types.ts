import { GasFeeSpeed } from '@xdefi/chains-core'

export type BitcoinFees = null | { [key in GasFeeSpeed]: number }
