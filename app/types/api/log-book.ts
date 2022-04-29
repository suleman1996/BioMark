export interface LogBookResponse {
  record_date: string;
  list: LogBookEntry[];
}

export interface LogBookRequest {
  log_book: {
    log_type: LogTypeFilter;
    date_condition: LogDateFilter;

    date_to?: string;
    date_from?: string;
  };
}

export enum LogDateFilter {
  today = 0,
  thisWeek = 1,
  dateRange = 3,
  all = 9,
}

export enum LogTypeFilter {
  weight = 99,
  blood_pressure = 98,
}

export interface LogBookEntry {
  id: number;
  log_type: string;
  data_value: string;
  unit_list_id: number;
  record_date: string;
  meal_type: string | null;
  meal_type_id: number | null;
  symptom_type: string | null;
  target_range_id: number;
  record_status: string;
  is_active: true;
  medication_record_id: any | null;
  record_date_day: string;
  medication_record_history_id: null;
  symptom_type_id: number | null;
  unit_name: string;

  target: {
    value_from: string | null;
    value_to: string | null;
    unit_list_id: number;
    created_at: string;
    ppg_value_from: string | null;
    ppg_value_to: string | null;
    record_date_day: string;
    unit_name: string;
  };

  medication_details: {
    id: number;
    disease_type: string;
    medication_list_id: number;
    dosage: string;
    frequency: string;
    unit_list_id: number;
    is_active: boolean;
    medication_name: string;
    disease_type_id: number;
    frequency_id: number;
    unit_name: string;
    medication_min_range: string;
    medication_max_range: string;
  };
}
