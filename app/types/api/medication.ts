import { ApiResponse } from './api-response';

export interface MedicationTrackersParams {
  date: string;
}

export interface MedicationTracker {
  selected: boolean;
  date: string;
  logs: MedicationTrackerLog[];
}

export interface MedicationTrackerLog {
  medication_log_id: number;
  frequency_time: string;
  medication_list_id: number;
  unit_list_id: number;
  unit_list_name: string;
  dosage: string;
  unit: string;
  medication: string;
  taken: boolean;
  overdue: boolean;
  message: string;
  meal_type_id: number;
  record_date: string;
  offline?: boolean;
  selected?: boolean;
}

export type MedicationTrackersResponse = ApiResponse<MedicationTracker[]>;

export interface MedicationTrackerPayload {
  meal_type: Meal[];
  medication_dropdown: boolean;
  medication: {
    medication_log_id: number;
    meal_type_id: number;
    medication_list_id: number;
    unit_list_id: number;
    unit_list_name: string;
    name: string;
    dosage: string;
    min_range?: number;
    max_range?: number;
    record_date?: string;
  };
}

export interface Meal {
  id: number;
  name: string;
}

export type MedicationTrackerResponse = ApiResponse<MedicationTrackerPayload>;

export interface MedicationTrackerEditRequest {
  medication: {
    dosage: string;
    record_date: string;
    meal_type: number;
    medication_log_id: number;
    unit_list_id: number;
  };
}

export interface MedicationTrackerSetup {
  meal_type: Meal[];
  medication_dropdown: boolean;
  medication: MedicationTrackerSetupEntry[];
}

export interface MedicationTrackerSetupEntry {
  medication_log_id: number;
  meal_type_id: number;
  medication_list_id: number;
  unit_list_id: number;
  unit: string;
  name: string;
  dosage: string;
  min_range: number;
  max_range: number;
  record_date: string;
}

export type MedicationTrackerSetupResponse = ApiResponse<MedicationTrackerSetup>;

export interface MedicationListEntry {
  name: string;
  medication_record_id: number;
}

export type MedicationListResponse = ApiResponse<MedicationListEntry[]>;

export interface MedicationSetupPayload {
  medication_list: MedicationSetupEntry[];
  unit_list: MedicationSetupUnit[];
  frequency_list: MedicationSetupFrequency[];
}

export interface MedicationSetupEntry {
  id: number;
  name: string;
  min_range: number;
  max_range: number;
  unit_list_id: number;
  unit_list_name: string;
  disease_list: MedicationSetupDisease[];
}

export interface MedicationSetupDisease {
  id: number;
  name: string;
}

export interface MedicationSetupUnit {
  id: number;
  name: string;
}

export interface MedicationSetupFrequency {
  id: number;
  name: string;
  frequency_time: string[];
}

export type MedicationSetupResponse = ApiResponse<MedicationSetupPayload>;

export interface MedicationSaveRequest {
  medication: {
    disease_type: number;
    medication_list_id: number;
    unit_list_id: number;
    dosage: number;
    frequency: number;
    frequency_time: string[];
    start_date: string;
    end_date: string;
  };
}

export interface MedicationPayload {
  id: number;
  name: string;
  medication_list_id: number;
  unit_list_id: number;
  unit_list_name: string;
  disease_type: string;
  disease_type_id: number;
  dosage: string;
  frequency: string;
  frequency_id: number;
  frequency_time: string[];
  start_date: string;
  end_date: string;
}

export type MedicationResponse = ApiResponse<MedicationPayload>;

export interface MedicationEditRequest {
  medication: {
    disease_type: number;
    medication_list_id: number;
    unit_list_id: number;
    dosage: string;
    frequency: number;
    frequency_time: string[];
    start_date: string;
    end_date: string;
  };
}
