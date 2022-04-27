import { ApiResponse } from './api-response';

export type DependentResponse = ApiResponse<DependentData>;

export interface DependentRequest {
  profile: {
    email: string;
  };
}

export interface DependentData {
  id: number;
  first_name: string;
  last_name: string;
  document_type: string;
  type: string;
  name: string;
  document_type_id: number;
  test_booking_status: any;
}
