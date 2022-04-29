import { ApiResponse } from './api-response';

export interface ForgotPasswordRequest {
  username: string;
}

export type ForgotPasswordResponse = ApiResponse<ForgotPasswordPayload>;

export interface ForgotPasswordPayload {
  code_delivery_details: {
    destination: string;
    delivery_medium: string;
    attribute_name: string;
  };
}
