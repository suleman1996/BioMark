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

export interface DependentsRequest {
  dependent: {
    first_name: string;
    last_name: string;
    document_type: string; //Either 'id_card' or 'passport'
    dependent_type_id: number; //From get dependent types
    id_number: string;
    birth_date: string; //2012-09-10
    email: string;
    phone_number: string;
    gender_id: number; // 1 = Male, 2 = Female, 3 = Others
    country_code: string;
    country_phone_code: string;
  };
}
