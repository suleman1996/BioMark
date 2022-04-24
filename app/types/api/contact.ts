import { ApiResponse } from './api-response';

export type UpdateEmailResponse = ApiResponse<Contact>;

export interface UpdateEmailRequest {
  profile: {
    email: string;
  };
}

export interface Contact {
  email: string;
}

