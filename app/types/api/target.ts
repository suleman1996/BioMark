export interface LatestTargetResponse {
  status: boolean;
  data: {
    blood_sugar?: LatestBloodSugarResponse;
    hba1c?: LatestHba1CResponse;
  };
}

export interface LatestBloodSugarResponse {
  id: number;
  value_from: string;
  value_to: string;
  unit_list_id: number;
  created_by: string;
  ppg_value_from: string;
  ppg_value_to: string;
  ppg_unit_id: number;
  record_date_day: string;
  unit_name: string;
}

export interface LatestHba1CResponse {
  id: number;
  unit_list_id: number;
  created_by: string;
  goal_value: string;
  record_date_day: string;
  unit_name: string;
}

export interface CreateTargetResponse {
  message: string;
}

export interface SetDefaultTargetResponse {
  status: boolean;
  data:
    | [
        {
          message: string;
        }
      ]
    | { message: string };
}

export interface GetBloodSugarTargetsResponse {
  status: boolean;
  data: GetBloodSugarTargetsResponseData[];
}

export interface GetHba1cTargetsResponse {
  status: boolean;
  data: GetHba1cTargetsResponseData[];
}

export interface GetBloodSugarTargetsResponseData {
  value_from: string;
  value_to: string;
  unit_list_id: number;
  created_at: string;
  ppg_value_from: string;
  ppg_value_to: string;
  ppg_unit_id: number;
  record_date_day: string;
  target_create_by: string;
  unit_name: string;
}

export interface GetHba1cTargetsResponseData {
  unit_list_id: number;
  created_at: string;
  goal_value: string;
  record_date_day: string;
  target_create_by: string;
  unit_name: string;
}

export interface BloodSugarInputTarget {
  range_type: number;
  value_to: string;
  value_from: string;
  unit_list_id: number;
  ppg_value_from: string;
  ppg_value_to: string;
  ppg_unit_id?: number;
}

export interface Hba1cTarget {
  range_type: number;
  goal_value: string;
  unit_list_id: number;
}

export interface NewTarget {
  blood_sugar_unit: TargetUnitsResponse[];
  hba1c_unit: TargetUnitsResponse[];
}

export interface TargetUnitsResponse {
  id: number;
  name: string;
  use_for: string;
  status: boolean;
}

export interface TargetUnit {
  id: number;
  name: 'mg/dL' | 'mmol/L' | '%';
}
export interface CreateTargetRequestBody {
  target: CreateTargetRequest;
}

export interface CreateTargetRequest {
  range_type: number;
  value_to?: string;
  value_from?: string;
  unit_list_id: number;
  ppg_value_from?: string;
  ppg_value_to?: string;
  ppg_unit_id?: number;
  goal_value?: string;
}
