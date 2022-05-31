import { RangeValue } from '../../api/models';

import * as moment from 'moment';
import {
  graphBlackColor,
  graphGreyColor,
  graphNeutralColor,
  graphNeutralColorLight,
  graphPositiveColor,
  graphTypeLine,
  GraphXAxisConfig,
} from './graph.types';

export const milliSecIn1Hour = 1000 * 60 * 60;

export const createGraphDataPointOptions = (
  color = graphPositiveColor,
  lineColor = graphPositiveColor,
  type = graphTypeLine,
  backgroundColor = graphNeutralColor,
  borderColor = graphNeutralColorLight
) => ({
  backgroundColor,
  borderColor,
  color,
  type,
  lineColor,
});

export const dateFormat = (
  value: number,
  index: number,
  dateRange: RangeValue
): string => {
  if (index === 0) {
    return ``;
  }

  switch (dateRange) {
    case RangeValue.oneDay:
      return `${moment(value).format('ha')}`;
    case RangeValue.sevenDays:
      return `${moment(value).format('D/M')}`;
    case RangeValue.lastMonth:
      return `${moment(value).format('D/M')}`;
    case RangeValue.threeMonths:
      return `${moment(value).format('D/M')}`;
    case RangeValue.oneYear:
      return `${moment(value).format('MMM')}`;
    case RangeValue.all:
      return `${moment(value).add(1, 'year').format('YYYY')}`;
  }
};

export const graphXAxisConfig = (
  selectedIndex: number,
  dates: number[]
): GraphXAxisConfig => {
  const today = moment(dates[dates.length - 1]);
  const todayMilliSecs = parseFloat(today.format('x'));

  const lastDayLeftBoundary = parseFloat(today.subtract(1, 'day').format('x'));
  const last7daysLeftBoundary = parseFloat(
    today.subtract(6, 'days').format('x')
  );
  const lastMonthLeftBoundary = parseFloat(
    today.subtract(25, 'days').format('x')
  );
  const last3MonthsLeftBoundary = parseFloat(
    today.subtract(2, 'months').format('x')
  );
  const lastYearLeftBoundary = parseFloat(
    today.subtract(9, 'months').format('x')
  );
  const last5YearLeftBoundary = parseFloat(
    today.subtract(4, 'years').format('x')
  );

  let intervalSize: number;
  let leftBoundary: number;
  let numberOfSections: number;
  let dateRange: RangeValue;

  const maxDate = todayMilliSecs;
  let minDate = dates[0];

  // 1 hour is the resolution of the whole calculation
  switch (selectedIndex) {
    case 0:
      intervalSize = 1000 * 60 * 60 * 6; // 6 hours
      leftBoundary = lastDayLeftBoundary;
      numberOfSections = 4;
      dateRange = RangeValue.oneDay;
      minDate = minDate < lastDayLeftBoundary ? minDate : lastDayLeftBoundary;
      break;

    case 1:
      intervalSize = 1000 * 60 * 60 * 24; // one day
      leftBoundary = last7daysLeftBoundary;
      numberOfSections = 7;
      dateRange = RangeValue.sevenDays;
      minDate =
        minDate < last7daysLeftBoundary ? minDate : last7daysLeftBoundary;
      break;

    case 2:
      intervalSize = 1000 * 60 * 60 * 24 * 7; // eight days
      leftBoundary = lastMonthLeftBoundary;
      numberOfSections = 4;
      dateRange = RangeValue.lastMonth;
      minDate =
        minDate < lastMonthLeftBoundary ? minDate : lastMonthLeftBoundary;
      break;

    case 3:
      intervalSize = 1000 * 60 * 60 * 24 * 31; // 31 days
      leftBoundary = last3MonthsLeftBoundary;
      numberOfSections = 3;
      dateRange = RangeValue.threeMonths;
      minDate =
        minDate < last3MonthsLeftBoundary ? minDate : last3MonthsLeftBoundary;
      break;

    case 4:
      intervalSize = 1000 * 60 * 60 * 24 * 31 * 3; // 3 months
      leftBoundary = lastYearLeftBoundary;
      numberOfSections = 12;
      dateRange = RangeValue.oneYear;
      minDate = minDate < lastYearLeftBoundary ? minDate : lastYearLeftBoundary;
      break;

    case 5:
      intervalSize = 1000 * 60 * 60 * 24 * 31 * 12; // 12 months
      leftBoundary = last5YearLeftBoundary;
      numberOfSections = 5;
      dateRange = RangeValue.all;
      minDate =
        minDate < last5YearLeftBoundary ? minDate : last5YearLeftBoundary;
      break;
  }

  return {
    intervalSize,
    leftBoundary,
    numberOfSections,
    dateRange,
    maxDate,
    minDate,
  };
};

export const convertDate = (date: string) =>
  parseFloat(moment.parseZone(date).local().format('x'));

export const graphXAxisHba1CConfig = (
  selectedIndex: number,
  dates: number[]
): GraphXAxisConfig => {
  const today = moment(dates[dates.length - 1]);
  const todayMilliSecs = parseFloat(today.format('x'));

  const lastMonthLeftBoundary = parseFloat(
    today.subtract(1, 'month').format('x')
  );
  const last3MonthsLeftBoundary = parseFloat(
    today.subtract(2, 'months').format('x')
  );
  const lastYearLeftBoundary = parseFloat(
    today.subtract(9, 'months').format('x')
  );
  const last5YearLeftBoundary = parseFloat(
    today.subtract(4, 'years').format('x')
  );

  let intervalSize: number;
  let leftBoundary: number;
  let numberOfSections: number;
  let dateRange: RangeValue;

  const maxDate = todayMilliSecs;
  let minDate = dates[0];

  // 1 hour is the resolution of the whole calculation
  switch (selectedIndex) {
    case 0:
      intervalSize = 1000 * 60 * 60 * 24 * 7; // eight days
      leftBoundary = lastMonthLeftBoundary;
      numberOfSections = 4;
      dateRange = RangeValue.lastMonth;
      minDate =
        minDate < lastMonthLeftBoundary ? minDate : lastMonthLeftBoundary;
      break;

    case 1:
      intervalSize = 1000 * 60 * 60 * 24 * 31; // 31 days
      leftBoundary = last3MonthsLeftBoundary;
      numberOfSections = 3;
      dateRange = RangeValue.threeMonths;
      minDate =
        minDate < last3MonthsLeftBoundary ? minDate : last3MonthsLeftBoundary;
      break;

    case 2:
      intervalSize = 1000 * 60 * 60 * 24 * 31 * 3; // 3 months
      leftBoundary = lastYearLeftBoundary;
      numberOfSections = 12;
      dateRange = RangeValue.oneYear;
      minDate = minDate < lastYearLeftBoundary ? minDate : lastYearLeftBoundary;
      break;

    case 3:
      intervalSize = 1000 * 60 * 60 * 24 * 31 * 12; // 12 months
      leftBoundary = last5YearLeftBoundary;
      numberOfSections = 5;
      dateRange = RangeValue.all;
      minDate =
        minDate < last5YearLeftBoundary ? minDate : last5YearLeftBoundary;
      break;
  }

  return {
    intervalSize,
    leftBoundary,
    numberOfSections,
    dateRange,
    maxDate,
    minDate,
  };
};

export const baseAxisOptions = () => ({
  axisLine: {
    lineStyle: {
      color: graphGreyColor,
      width: 2,
    },
    onZero: false,
  },
  axisLabel: {
    margin: 16,
    fontSize: 9,
    color: graphBlackColor,
    fontWeight: 'bold',
    interval: 0,
  },
  axisTick: {
    show: false,
  },
});
