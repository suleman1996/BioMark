import { ApiResponse } from './api-response';
import { EntryUpdateType, RangeValue } from './progress';
import { BloodPressureUnit } from '../../modules/progress/models/measurement-units';

export interface BloodPressureProgressEntryRequest {
  medical: {
    bp_systolic: string;
    bp_diastolic: string;
    date_entry: string;
  };
}

export interface BloodPressureProgressEntryPayload {
  id: number;
  bp_systolic: string;
  bp_diastolic: boolean;
  date_entry: string;
  is_doctor: boolean;
  formated_date_entry: string;
}

export interface BloodPressureProgressLogsFilters {
  type: EntryUpdateType;
  page: number;
}

export interface BloodPressureProgressChartFilters {
  date: string;
  type: EntryUpdateType;
}

export interface BloodPressureProgressLog {
  id: number;
  bp_systolic: string;
  bp_diastolic: string;
  date_entry: string;
  formated_date_entry: string;
  is_doctor: boolean;
}

export interface BloodPressureProgressLogsPayload {
  name: string;
  unit: BloodPressureUnit;
  definition: string;
  page: number;
  log: BloodPressureProgressLog[];
}

export interface BloodPressureProgressChartDataPoint {
  date: string;
  systolic: string;
  diastolic: string;
  unit: BloodPressureUnit;
}

export interface BloodPressureProgressChartDataPayload {
  name: string;
  unit: BloodPressureUnit;
  definition: string;
  view: string;
  page: number;
  chart: BloodPressureProgressChartDataPoint[];
}

export type BloodPressureProgressLogsResponse =
  ApiResponse<BloodPressureProgressLogsPayload>;
export type BloodPressureProgressChartDataResponse =
  ApiResponse<BloodPressureProgressChartDataPayload>;

export type BloodPressureProgressEntryResponse =
  ApiResponse<BloodPressureProgressEntryPayload>;

export const defaultBloodPressureProgressLogsFilters = {
  date: RangeValue.sevenDays,
  type: EntryUpdateType.all,
  page: 1,
} as BloodPressureProgressLogsFilters;

export const defaultBloodPressureProgressChartFilters = {
  type: EntryUpdateType.all,
} as BloodPressureProgressChartFilters;
