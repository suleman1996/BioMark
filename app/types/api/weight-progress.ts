import { ApiResponse } from './api-response';
import { EntryUpdateType, RangeValue } from './progress';
import { WeightUnit } from 'src/app/modules/progress/models/measurement-units';

export interface WeightProgressEntryRequest {
  medical: {
    weight: string;
    is_metric: boolean;
    date_entry: string;
  };
}

export interface WeightProgressEntryPayload {
  id: number;
  weight: string;
  is_metric: boolean;
  date_entry: string;
  is_editted: boolean;
  formated_date_entry: string;
}

export interface WeightProgressLogsPayload {
  name: string;
  unit: string;
  log: WeightProgressLog[];
}

export interface WeightProgressChartDataPayload {
  name: string;
  unit: string;
  view: string;
  page: number;
  chart: WeightProgressChartPoint[];
}

export interface WeightProgressLog {
  id: number;
  weight: number;
  unit: string;
  is_doctor: boolean;
  date_entry: string;
  formated_date_entry: string;
}

export interface WeightProgressChartPoint {
  date: string;
  weight: number;
  unit: string;
}

export interface WeightProgressChartFilters {
  date: string;
  metric: boolean;
  type: string;
}

export interface WeightProgressLogsFilters {
  metric: boolean;
  type: string;
  page: number;
}

export type WeightProgressLogsResponse = ApiResponse<WeightProgressLogsPayload>;
export type WeightProgressChartDataResponse =
  ApiResponse<WeightProgressChartDataPayload>;

export type WeightProgressEntryResponse =
  ApiResponse<WeightProgressEntryPayload>;

export const defaultWeightProgressChartFilters = {
  date: RangeValue.sevenDays,
  metric: true,
  type: EntryUpdateType.all,
} as WeightProgressChartFilters;

export const defaultWeightProgressLogsFilters = {
  metric: true,
  type: EntryUpdateType.all,
  page: 1,
} as WeightProgressLogsFilters;
