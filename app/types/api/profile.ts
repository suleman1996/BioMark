import { ApiResponse } from './api-response';

export type ProfileResponse = ApiResponse<Profile>;

export interface ProfileUpdateRequest {
  first_name: string;
  last_name: string;
  birth_date: string;
  gender_id: number;
  email: string;
}

export interface ProfileLangRequest {
  profile: {
    app_lang: string;
  };
}

export interface SetLangProfileResponse {
  message: string;
}

export interface Profile {
  app_lang: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  full_name: string;
  birth_date: string;
  gender_id: number;
  country_id: number;
  ic_number: string;
  mmc_reg_number: string;
  ethnic: Ethnicity;
  picture: string;
  id_verification: string;
  patient_id: number;
  migrated: boolean;
  prefix: string;
  is_tos_agree: boolean;
  sfi_code: string;
  prc_number: number;
  take_photo: boolean;
  is_temporary: boolean;
  employer: any; // TODO Response type is unkown atm
  eorder_alias: any; // TODO Response type is unkown atm
  gender_attribute: {
    id: number;
    name: string;
  };
  country_attribute: {
    id: number;
    name: string;
    dial_code: string;
    code: string;
  };
  ic_attribute: {
    id: number;
    id_number: string;
    id_source: string;
    status: boolean;
  };
  contact_attribute: {
    id: number;
    mobile: string;
    email_address: string;
  };
  dependent_count: number;
  first_booking_voucher: boolean;
}

export enum Ethnicity {
  caucasian = 'Caucasian',
  chinese = 'Chinese',
  filipino = 'Filipino',
  indian = 'Indian',
  malay = 'Malay',
  na = 'Other / NA',
}
