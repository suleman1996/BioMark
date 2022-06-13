import { ApiResponse } from './api-response';
import { RangeValue } from './progress';

enum MealTypeUnit {
  beforeBreakfast = 'Before Breakfast',
  afterBreakfast = 'After Breakfast',
  beforeLunch = 'Before Lunch',
  afterLunch = 'After Lunch',
  beforeDinner = 'Before Dinner',
  afterDinner = 'After Dinner',
  bedtime = 'Bedtime',
  afterMeal = 'After Meal',
  fasting = 'Fasting',
  all = 'All',
}

export interface BloodSugarProgressTarget {
  fpg_from: string;
  fpg_to: string;
  fpg_unit_id: number;
  ppg_from: string;
  ppg_to: string;
  ppg_unit_id: number;
}

export interface BloodSugarProgressSectionRange {
  min: number;
  max: number;
}

export interface BloodSugarProgressChartSection {
  range: BloodSugarProgressSectionRange;
  finding: string;
}

export interface BloodSugarProgressChartPoint {
  date: string;
  value: number | null;
}

export interface BloodSugarProgressChart {
  min: number;
  max: number;
  labels: number[];
  sections: BloodSugarProgressChartSection[];
  data: BloodSugarProgressChartPoint[];
  target: BloodSugarProgressTarget;
}

export interface BloodSugarProgressChartDataPayload {
  name: string;
  definition: string;
  unit: string;
  filter: string;
  view: string;
  page: number;
  has_target: boolean;
  chart: BloodSugarProgressChart;
}

export interface BloodSugarProgressLog {
  id: number;
  orig_value: string;
  data_value: string;
  unit_id: number;
  unit_name: string;
  meal_type: string;
  meal_type_id: number;
  record_date: string;
  record_status: string;
  record_date_format: string;
  record_time_format: string;
}

export interface BloodSugarProgressLogsPayload {
  name: string;
  definition: string;
  unit: string;
  filter: string;
  has_target: boolean;
  page: number;
  log: BloodSugarProgressLog[];
}

export interface BloodSugarProgressEntryRequest {
  blood_sugar: {
    data_value: string;
    unit_list_id: number;
    record_date: string;
    meal_type_id: number;
  };
}

export interface BloodSugarProgressEntryPayload {
  id?: number;
  data_value: string;
  unit_list_id: number;
  record_date: string;
  meal_type?: string;
  meal_type_id: number;
  unit_name?: string;
}

export interface BloodSugarProgressMealTypePayload {
  id: string;
  name: string;
}

export interface BloodSugarProgressUnitPayload {
  id: string;
  name: string;
}

export interface BloodSugarProgressSetupPayload {
  meal_type: BloodSugarProgressMealTypePayload[];
  unit_list: BloodSugarProgressUnitPayload[];
}

export type BloodSugarProgressLogsResponse =
  ApiResponse<BloodSugarProgressLogsPayload>;
export type BloodSugarProgressChartDataResponse =
  ApiResponse<BloodSugarProgressChartDataPayload>;

export type BloodSugarProgressEntryResponse =
  ApiResponse<BloodSugarProgressEntryPayload>;
export type BloodSugarProgressSetupResponse =
  ApiResponse<BloodSugarProgressSetupPayload>;

export interface BloodSugarProgressChartFilters {
  date: string;
  meal: string;
  unit: number;
}

export interface BloodSugarProgressLogsFilters {
  meal: string;
  unit: number;
  page: number;
}

export enum BloodSugarTrackerStatus {
  low = 'low',
  normal = 'normal',
  high = 'high',
}

export const defaultBloodSugarProgressChartFilters = {
  date: RangeValue.oneDay,
  meal: MealTypeUnit.all,
  unit: 1,
} as BloodSugarProgressChartFilters;

export const defaultBloodSugarProgressLogsFilters = {
  meal: MealTypeUnit.all,
  unit: 1,
  page: 1,
} as BloodSugarProgressLogsFilters;

export interface BloodSugarInfo {
  unit: string;
  filter: string;
  definition: string;
}
