import { ApiResponse } from './api-response';

export interface ResetPasswordRequest {
  password: {
    username: string;
    password: string;
    code: string;
  };
}

export interface NewPasswordRequest {
  current_password: string;
  new_password: string;
}

export type ResetPasswordResponse = ApiResponse<ResetPasswordPayload>;

export interface ResetPasswordPayload {
  message: string;
}
