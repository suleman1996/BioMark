

import { ApiResponse } from './api-response';

export type CovidDependantListResponse = ApiResponse<CovidDependantList>

export interface CovidDependantList {
    status: boolean;
    data: {
      message: string
     };
  }


  export interface CovidBookingDependant {
    first_name:string,
    last_name:string,
    name:string, 
    age: number,
    document_type:string,
    dependent_type_id:number,
    id_number:string     
}



  export interface CovidDependantRequest {
    dependent:{
      first_name:string,
      last_name:string,
      name:string, 
      document_type:string,
      dependent_type_id:number,
      id_number:string,
      birth_date:Date,
      email: string,
      phone_number: string,
      gender_id: number,
      country_code: string,
      country_phone_code: string,
      }
  }


  export interface CovidDependantResponse {
    status: boolean
    data: {
      first_name:string,
      last_name:string,
      name:string, 
      age: number,
      document_type:string,
      dependent_type_id:number,
      id_number:string,
      countryCode: any,
      country_code: any,
      birth_date: any,
      email: string,
      phone_number:any;
      gender_id: number,
      countryCodePhoneCode: any,
      phoneNumber:string,
      dependent_email: string,
      dependent_dob: Date,
      dependent_gender: any,
      dependent_mobile_number: string;
      country_phone_code: any;
    }
  }

