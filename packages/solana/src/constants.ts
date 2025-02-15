export const DEFAULT_FEE = 5000;

export interface BroadcastOptions {
  skipPreflight?: boolean;
  preflightCommitment?: 'processed' | 'confirmed' | 'finalized';
  maxRetries?: number;
  minContextSlot?: number;
}

export const DEFAULT_BROADCAST_OPTIONS: BroadcastOptions = {
  skipPreflight: false,
  preflightCommitment: 'confirmed',
  maxRetries: 0,
};

export const NOOP_PROGRAM_ADDRESS =
  'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV';
