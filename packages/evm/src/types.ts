export interface RestEstimateGasRequest {
  from: string;
  to: string;
  value?: string; // hex string
  data?: string;
}
