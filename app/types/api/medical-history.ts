import { ApiResponse } from './api-response';
import { MedicalTemplateType } from './bootstrap';
import { LifestyleResponsePayload } from './lifestyle';

export interface MedicalHistoryRequest {
  medical_history: {
    ethnic?: string;
    conditions: MedicalHistoryCondition[];
  };
}

export interface MedicalHistoryItemRequest {
  medical_history:
    | MedicalHistoryCondition
    | MedicalHistoryCondition[]
    | MedicalHistoryAllergyRequest;
}

export interface MedicalHistoryExerciseRequest {
  lifestyle?: MedicalHistoryLifestyleValue;
}

export interface MedicalHistoryStressRequest {
  stress: {
    question1: number;
    question2: number;
    question3: number;
    question4: number;
  };
}

export interface MedicalHistoryAllergyCondition {
  has_condition: boolean;
  allergy_to: string;
  allergy_type: string;
}

export interface MedicalHistoryAllergyRequest {
  has_allergy: number;
  conditions: MedicalHistoryAllergyCondition[];
}

export interface MedicalHistorySleepingRequest {
  lifestyle: {
    sleep_duration: string;
  };
}

export interface MedicalHistoryVaccineValue {
  has_condition: number;
  vaccine_list: string;
}

export interface MedicalHistoryCondition {
  has_condition?: boolean;
  other_condition?: string;
  condition_id?: number;
  medical_type?: MedicalTemplateType;
  taking_medication?: boolean;
  medication_list?: string;
  vaccine_list?: string;
  medical_values?: MedicalHistoryItemValues;
  allergy_to?: string;
  allergy_type?: string;
  lifestyle?: MedicalHistoryLifestyleValue;
  stress?: MedicalHistoryStressValue;
}

export interface MedicalHistoryLifestyleValue {
  sleep_duration?: string;
  is_exercise?: boolean;
  exercise_per_week?: string;
  exercise_per_session?: string;
  is_drinking?: boolean | string;
  pints_of_beer?: number;
  glasses_of_wine?: number;
  shots_of_spirits?: number;
  is_smoking?: string;
  stick_per_day?: number;
  smoking_stop_at?: number;
  smoking_start_at?: number;
}

export interface MedicalHistoryStressValue {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
}

export type MedicalHistoryStressResponse =
  ApiResponse<MedicalHistoryStressValue>;
export type MedicalHistoryResponse = ApiResponse<MedicalHistoryResponseData>;
export type MedicalHistoryItemResponse = ApiResponse<MedicalHistoryItem>;

export interface MedicalHistoryResponseData {
  personal: MedicalHistoryItem[] | null;
  family: MedicalHistoryItem[] | null;
  vaccine: MedicalHistoryItem[] | null;
  allergy: MedicalHistoryItem | null;
}

export interface MedicalHistoryWithLifestyle
  extends MedicalHistoryResponseData,
    LifestyleResponsePayload {}

export interface MedicalHistoryItem {
  id: number;
  condition_id: number;
  other_condition: string | null;
  medical_type: MedicalTemplateType;
  has_condition: boolean;
  taking_medication: boolean;
  medication_list: string | null;
  vaccine_list: string | null;
  medical_values: MedicalHistoryItemValues | null;
  gestational: boolean;
  allergy_to: string;
  allergy_type: string;
  has_allergy: number;
  conditions: MedicalHistoryItem[];
  is_smoking: string;
  stick_per_day: number;
  smoking_stop_at: number;
  smoking_start_at: number;
  is_drinking: boolean;
  pints_of_beer: number;
  question1: number;
  question2: number;
  question3: number;
  question4: number;
  glasses_of_wine: number;
  shots_of_spirits: number;
  is_exercise: boolean;
  exercise_per_week: string;
  exercise_per_session: string;
  sleep_duration: string;
}

export interface MedicalHistoryItemValues {
  options?: string;
  otherOptions?: string;
  diabetes_type?: string;
  treatment?: boolean;
  treatmentType?: string;
}

export interface SmokingStopYearPayload {
  smoking_start_year: string[];
  selected_start_year: number;
  smoking_stop_year: string[];
}

export interface SmokingStopYearRequest {
  start: string;
  option: number;
}

export type SmokingStopYearResponse = ApiResponse<SmokingStopYearPayload>;
