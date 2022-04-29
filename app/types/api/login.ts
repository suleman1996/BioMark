import { ApiResponse } from './api-response';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface FederatedRequest {
  access_token: string;
  provider: string;
  group: string;
}

export type LoginResponse = ApiResponse<LoginPayload>;

export interface LoginPayload {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  message: string;
  first_login: boolean;
  has_profile: boolean;
}
