import { Time } from '@angular/common';
import { ApiResponse } from './api-response';

export type CovidResponse = ApiResponse<CovidResponseData>;
export type CovidResultList = ApiResponse<CovidResultListResponse[]>;
export type CovidBookingListResponse =
  ApiResponse<CovidBookingListResponseData>;
export type CancelCovidBookingResponse =
  ApiResponse<CancelCovidBookingResponseData>;
export type CovidBookingResponse = ApiResponse<CovidBookingResponseData>;
export type UpdateICResponse = ApiResponse<UpdateICResponseData>;

export interface CovidBookingListResponseData {
  // booking_list: BookingListData[]

  history: BookingListData[];
  upcoming: BookingListDataUpcoming[];
}

export interface BookingListDataUpcoming {
  id: number;
  test_type_name: string;
  test_country_name: string;
  test_city_name: string;
  test_centre_name: string;
  booking_schedule: Date;
  booking_slot_time: Time;
  booking_test_type: string;
  booking_status: string;
  declaration_complete: boolean;
  declaration_enabled: boolean;
  is_cancellable: boolean;
  is_dependent: boolean;
  patient_name: string;
  reference_code: string;
}

export interface BookingListData {
  id: number;
  booking_schedule: Date;
  test_type_name: string;
  test_country_name: string;
  test_city_name: string;
  test_centre_name: string;
  booking_slot_time: Time;
  booking_test_type: string;
  booking_status: string;
  declaration_complete: boolean;
  declaration_enabled: boolean;
  is_cancellable: boolean;
  is_dependent: boolean;
  patient_name: string;
  reference_code: string;
}

export interface CovidResultListResponse {
  id: number;
  name: string;
  date_of_test: string;
  test_type: string;
  order_id: string;
  test_result: string;
}

export interface CovidResponseData {
  header: string;
  'sub-header': string;
  test_result_id: number;
  test_result: string;
  test_center: string;
  test_type: string;
  test_date: string;
  test_report_date: string;
  test_patient: string;
  test_qr: string;
}

export interface CovidTestData {
  header: string;
  subHeader: string;
  testResultId: number;
  testResult: string;
  testCenter: string;
  testType: string;
  testDate: string;
  testReportDate: string;
  testPatient: string;
  testQr: string;
}

export type CovidResultLatestResponse = ApiResponse<CovidLatestResponse[]>;

export interface CovidBookingHealthDeclarationResponse {
  status: boolean;
}

export interface CovidLatestResponse {
  order: number;
  name: string;
  results: CovidResult[];
}

export interface CovidResult {
  link: string;
  result: string;
  result_date: string;
}
export interface CovidBookingResponseData {
  status: boolean;
  user_reference_code: string;
  dependent_reference_codes: [];
}
export interface CancelCovidBookingResponseData {
  status: boolean;
  booking_status: string;
}

export interface UpdateICResponseData {
  status: boolean;
  message: string;
}

export type TestCenterData = ApiResponse<TestCenterResponse[]>;

export type BookingFormData = ApiResponse<BookingFormDataResponse>;

export interface CovidTestCentreScheduleRequest {
  test_centre: {
    test_centre_id: number;
  };
}

export interface TestCenterResponse {
  id: number;
  name: string;
  clinics: TestClinic[];
}

export interface TestClinic {
  id: number;
  test_centre_id: number;
  test_amount: number;
  currency: string;
  test_type_name: string;
  test_centre_name: string;
  test_centre_address: string;
  test_centre_lat: number;
  test_centre_long: number;
}

export interface CovidBookingRequest {
  booking: {
    is_dependant: boolean;
    dependent_id: number;
    test_type_id: number;
    schedule_id: number;
    slot_id: number;
    test_location: string;
    test_centre_name: string;
    test_city_name: string;
    test_country_name: string;
    test_centre_id: number;
    city_id: number;
    country_id: number;
    test_address: string;
    test_address_details: string;
    confirmation_date: Date;
    amount: number;
    booking_status: number;
    q1: boolean;
    q2: boolean;
    q3: boolean;
    q4: boolean;
    q5: boolean;
  };
}

export interface CovidBookingMultipleHealthDeclarationRequest {
  booking: [CovidBookingHealthDeclarationRequest];
}

export interface CovidBookingHealthDeclarationRequest {
  id: number;
  q1: boolean;
  q2: boolean;
  q3: boolean;
  q4: boolean;
  q5: boolean;
  terms: boolean;
}

export interface CovidBookingDependantRequest {
  booking: any;
}

export interface TestCentreScheduleResponse {
  id: number;
  test_centre_schedules: Schedule[];
  home_test_schedules: Schedule[];
}

export interface BookingFormDataResponse {
  country_list: Country[];
  first_booking_voucher: boolean;
  has_user_ic: boolean;
}

export interface Country {
  id: number;
  name: string;
  cities: City[];
}
export interface City {
  id: number;
  name: string;
  // test_centres: TestCentre[];
}
export interface TestCentre {
  id: number;
  name: string;
  test_centre_schedules: Schedule[];
  home_schedules: Schedule[];
}
export interface Schedule {
  id: number;
  schedule_date: Date;
  status: boolean;
  has_available_slot: boolean;
  slots: TimeSlot[];
  morning_time_slots: TimeSlot[];
}
export interface TimeSlot {
  id: number;
  slot_time: Time;
  meridian: string;
  status: boolean;
}

export interface CancelCovidBookingRequest {
  id: number;
}

export interface UpdateICRequest {
  ic_number: string;
}
