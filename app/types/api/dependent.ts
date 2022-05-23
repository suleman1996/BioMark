import { ApiResponse } from './api-response';

export type DependentResponse = ApiResponse<DependentData>;

export interface DependentRequest {
  profile: {
    email: string;
  };
}

export interface DependentSaveResponse {
  message: string;
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

export interface DependentSingleGetResponse {
  age: number;
  country_code: string;
  country_phone_code: string;
  dependent_dob: string;
  dependent_email: string;
  dependent_gender: number;
  dependent_mobile_number: string;
  dependent_type_id: number;
  document_type: string;
  document_type_id: string;
  first_name: string;
  id: number;
  id_number: string;
  last_name: string;
  name: string;
  type: string;
}

export interface DependentsRequest2 {
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
}
