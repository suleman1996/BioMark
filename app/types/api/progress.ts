import moment from 'moment';

import { RangeSelectorElement } from '../../common-ui/components';

export interface ProgressLog {
  id: number;

  date_entry?: string;
  data_value?: string;
  weight?: string;
  bp_systolic?: string;
  bp_diastolic?: string;

  is_editted?: boolean;
  is_doctor?: boolean;
  is_metric?: boolean;

  formated_date_entry?: string;
  unit_list_id?: number;
  record_date?: string;
  meal_type?: string;
  record_status?: string;
  meal_type_id?: number;
  unit_name?: string;
  record_date_format?: string;
  record_time_format?: string;
}

export interface ProgressParams {
  date?: RangeValue;
  page?: number;
  metric?: boolean;
  meal?: string;
  type?: EntryUpdateType;
  start?: string;
  end?: string;
  unit?: number;
}

export enum EntryUpdateType {
  me = 'me',
  doctor = 'doctor',
  all = 'all',
}

export enum RangeValue {
  oneDay = '1D',
  sevenDays = '7D',
  lastMonth = '1M',
  threeMonths = '3M',
  oneYear = '1Y',
  all = 'All',
}

export const ranges: RangeSelectorElement<number>[] = [
  { id: 0, value: RangeValue.oneDay, shortLabel: '1D', longLabel: '1 Day' },
  { id: 1, value: RangeValue.sevenDays, shortLabel: '7D', longLabel: '7 Days' },
  {
    id: 2,
    value: RangeValue.lastMonth,
    shortLabel: '1M',
    longLabel: 'Last Month',
  },
  {
    id: 3,
    value: RangeValue.threeMonths,
    shortLabel: '3M',
    longLabel: '3 Months',
  },
  { id: 4, value: RangeValue.oneYear, shortLabel: '1Y', longLabel: '1 Year' },
  { id: 5, value: RangeValue.all, shortLabel: 'All', longLabel: 'All' },
];

export const hba1cRanges: RangeSelectorElement<number>[] = [
  {
    id: 0,
    value: RangeValue.lastMonth,
    shortLabel: '1M',
    longLabel: 'Last Month',
  },
  {
    id: 1,
    value: RangeValue.threeMonths,
    shortLabel: '3M',
    longLabel: '3 Months',
  },
  { id: 2, value: RangeValue.oneYear, shortLabel: '1Y', longLabel: '1 Year' },
  { id: 3, value: RangeValue.all, shortLabel: 'All', longLabel: 'All' },
];

export const defaultProgressFilters = {
  date: RangeValue.threeMonths,
  page: 1,
  metric: true,
  type: EntryUpdateType.all,
  start: moment().format('YYYY-MM-DD'),
  end: moment().subtract(3, 'month').format('YYYY-MM-DD'),
};
