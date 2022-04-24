import { ApiResponse } from './api-response';
import { EntryUpdateType, RangeValue } from './progress';
import { BloodSugarProgressTarget } from './blood-sugar-progress';

export interface Hba1CProgressEntryRequest {
  hba1c: {
    data_value: string;
    unit_list_id: number;
    record_date: string;
  };
}

export interface Hba1CProgressEntryPayload {
  id: number;
  data_value: string;
  unit_list_id: number;
  record_date: string;
  unit_name: string;
}

export interface Hba1CProgressLogsPayload {
  name: string;
  unit: string;
  log: Hba1CProgressLog[];
}

export interface Hba1CProgressSectionRange {
  min: number;
  max: number;
}

export interface Hba1CProgressChartSection {
  range: Hba1CProgressSectionRange;
  finding: string;
}

export interface Hba1CProgressChartPoint {
  date: string;
  value: number | null;
}

export interface Hba1CProgressChart {
  min: number;
  max: number;
  labels: number[];
  sections: Hba1CProgressChartSection[];
  data: Hba1CProgressChartPoint[];
  target: BloodSugarProgressTarget;
}

export interface Hba1CProgressChartDataPayload {
  name: string;
  unit: string;
  view: string;
  page: number;
  chart: Hba1CProgressChart;
}

export interface Hba1CProgressLog {
  id: number;
  data_value: string;
  unit_list_id: number;
  record_date: string;
  record_status: string;
  unit_name: string;
  record_date_format: string;
}

export interface Hba1CProgressChartPoint {
  date: string;
  value: number;
  unit: string;
}

export interface Hba1CProgressChartFilters {
  date: string;
}

export interface Hba1CProgressLogsFilters {
  page: number;
}

export type Hba1CProgressLogsResponse = ApiResponse<Hba1CProgressLogsPayload>;
export type Hba1CProgressChartDataResponse =
  ApiResponse<Hba1CProgressChartDataPayload>;

export type Hba1CProgressEntryResponse = ApiResponse<Hba1CProgressEntryPayload>;

export const defaultHba1CProgressChartFilters = {
  date: RangeValue.oneYear,
  metric: true,
  type: EntryUpdateType.all,
} as Hba1CProgressChartFilters;

export const defaultHba1CProgressLogsFilters = {
  metric: true,
  type: EntryUpdateType.all,
  page: 1,
} as Hba1CProgressLogsFilters;

export enum HbA1CTrackerStatus {
  low = 'low',
  normal = 'normal',
  high = 'high',
}

export type HbA1CUnitResponse = ApiResponse<HbA1CUnitResponseData>;

export interface HbA1CUnitResponseData {
  unit_list: {
    id: number;
    name: string;
  }[];
}
