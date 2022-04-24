import { ApiResponse } from './api-response';

export type MedicalResponse = ApiResponse<MedicalResponseData>;

export interface MedicalResponseData {
  weight_attr: string;
  height_attr: string;
  systolic_attr: string;
  diastolic_attr: string;
  is_metric: boolean;
}
