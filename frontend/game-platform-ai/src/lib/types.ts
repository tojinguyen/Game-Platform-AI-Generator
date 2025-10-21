export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password?: string;
}

export interface OAuthRequest {
  token: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  exp: number;
}
