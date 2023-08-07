export interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface StoredToken {
  accessToken: string;
  refreshToken: string;
}
