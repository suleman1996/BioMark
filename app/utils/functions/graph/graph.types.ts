import { RangeValue } from 'types/api';

export const symbolSvgPath =
  'path://M120.79,164.61h0a15.51,15.51,0,0,1-15.57-15.46l-.11-27.83a15.52,' +
  '15.52,0,0,1,15.47-15.57h0a15.51,15.51,0,0,1,15.57,15.46l.1,27.82A15.52,15.52,0,0,1,120.79,164.61Z';

export const graphNegativeColor = '#dc4f53';
export const graphNegativeColorLight = '#FAD4D4';

export const graphPositiveColor = '#4fb585';
export const graphPositiveColorLight = '#D2F7EB';

export const graphNeutralColor = '#FFFFFF';
export const graphNeutralColorLight = '#EEEEEE';

export const graphWarningColor = '#F9C931';
export const graphWarningColorLight = '#F7EFD2';

export const graphGreyColor = '#AAAAAA';
export const graphGreyColorLight = '#CCCCCC';

export const graphTextColor = '#FFFFFF';
export const graphBlackColor = '#333333';

export const graphGridBackgroundColor = '#F2F2F2';

export const graphTypeLine = 'line';
export const graphTypeBar = 'bar';

export enum GraphFinding {
  low = 'low',
  high = 'high',
  normal = 'normal',
  normal_other = 'normal_other',
}

export interface GraphDataPoint {
  itemStyle: {
    color: string;
  };
  label: {
    backgroundColor?: string;
    borderColor?: string;
    color?: string;
    show?: boolean;
  };
}

export interface GraphData {
  data: GraphDataPointSetup[];
  labels: string[];
}

export interface GraphDataPointSetup {
  data: GraphDataPoint[];
  type: string;
  lineColor: string;
}

export interface GraphSeriesOptions {
  data: GraphDataPoint[];
  type: string;
  lineColor: string;
}

export interface GraphDataPointOptions {
  showOnlyLast: boolean;
  showLabels: boolean;
  backgroundColor: string;
  borderColor: string;
  color: string;
  lineColor: string;
  type: string;
}

export interface GraphXAxisConfig {
  intervalSize: number;
  leftBoundary: number;
  numberOfSections: number;
  dateRange: RangeValue;
  maxDate: number;
  minDate: number;
}
