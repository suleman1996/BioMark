import { ApiResponse } from './api-response';

export type IdVerificationResponse = ApiResponse<IdVerification>

export interface IdVerification {
    user_id: string;
    verification: boolean;
    status: string | null;
}

export interface CreateNewIDVerificationRequest {
    id_verification: {
      scan_reference: string;
      selected_country: string;
      id_number: string;
      document_type: string;
      t_and_c_status: boolean;
    };
  }
  
  export interface CreateNewIDVerificationResponse {
    message: string;
  }