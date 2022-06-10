import { ApiResponse } from './api-response';

export interface HealthTrackerPayload {
  blood_sugar: HealthTrackerPayloadData;
  medication: HealthTrackerPayloadData;
  hba1c: HealthTrackerPayloadData;
  weight: HealthTrackerPayloadData;
  blood_pressure: HealthTrackerPayloadData;
  page: string;
}

export interface HealthTrackerPayloadData {
  name: string;
  value: string;
  unit: string;
  card_status: string;
}

export interface MedicationTrackerRequest {
  medication: {
    dosage: string;
    record_date: string;
    medication_log_id: number;
    meal_type?: number;
  };
}

export type HealthTrackerResponse = ApiResponse<HealthTrackerPayload>;
