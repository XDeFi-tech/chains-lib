export interface InfoPubKey {
  type_url?: string;
  value?: string;
}

export interface AccountInfo {
  address?: string;
  pub_key?: InfoPubKey;
  account_number?: string;
  sequence?: string;
}
