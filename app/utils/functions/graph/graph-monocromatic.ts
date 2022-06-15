import {
  graphBlackColor,
  GraphDataPointSetup,
  graphGreyColor,
  graphGridBackgroundColor,
  GraphSeriesOptions,
  graphTypeLine,
  GraphXAxisConfig,
  symbolSvgPath,
} from './graph.types';

import { dateFormat } from './graph-utils';
import { RangeValue } from 'types/api';
// import moment from 'moment';

const createSimpleGraphDataPoint = (value) => ({
  value,
  symbol: 'none',
  name: value[0],
});

const createLastGraphDataPoint = (value, options: any) => ({
  value,
  itemStyle: {
    color: options.color,
  },
  label: {
    backgroundColor: options.backgroundColor,
    borderColor: options.borderColor,
    color: options.color,
  },
  name: value[0],
  symbol: symbolSvgPath,
});

export const isSymbolVisible = (
  value: any,
  index: number,
  data: any[],
  options: any
) => {
  let isSingleValue = true;

  for (let i = index; i < data.length; i++) {
    isSingleValue = data[i][1] === null;
  }

  return isSingleValue
    ? createLastGraphDataPoint(value, options)
    : createSimpleGraphDataPoint(value);
};

export const createGraphDataPoints = (data: any[], options: any): any => ({
  lineColor: options.lineColor,
  type: options.type,
  data: data.map((value, index) =>
    value[1] === null
      ? createSimpleGraphDataPoint(value)
      : index === data.length - 1
      ? createLastGraphDataPoint(value, options)
      : isSymbolVisible(value, index, data, options)
  ),
});

export const convertDataset = (dataset: GraphDataPointSetup[]) =>
  dataset.map((set) => ({
    data: set.data,
    type: graphTypeLine,
    lineColor: set.lineColor,
  }));

export const getGraphOptions = (
  series: GraphSeriesOptions[],
  config: GraphXAxisConfig
) => ({
  dataZoom: {
    type: 'inside',
    zoomLock: true,
    startValue: config.leftBoundary,
    endValue: config.maxDate,
    filterMode: 'none',
  },
  animation: false,
  xAxis: {
    maxInterval: config.intervalSize,
    type: 'time',
    axisLine: {
      lineStyle: {
        color: graphGreyColor,
        width: 2,
      },
    },
    axisLabel: {
      margin: 12,
      fontSize: 8,
      color: graphBlackColor,
      fontWeight: 'bold',
      interval: 0,
      formatter: (value, index) => {
        dateFormat(value, index, config.dateRange);
      },
      showMaxLabel: config.dateRange !== RangeValue.all,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
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
    boundaryGap: ['20%', '20%'],
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
    splitNumber: 4,
    min: 0,
  },
  grid: {
    backgroundColor: graphGridBackgroundColor,
    borderColor: 'transparent',
    show: true,
    top: 16,
    bottom: 24,
  },
  series: [
    ...series.map((dataGroup) => {
      return {
        type: dataGroup.type,
        data:
          //dataGroup.data.map((d) => d.value),
          dataGroup.data,
        symbolSize: 16,
        hoverAnimation: false,
        symbolKeepAspect: true,
        connectNulls: true,
        smooth: 0.2,
        z: 100,
        label: {
          show: true,
          fontWeight: 'bold',
          padding: [4, 8, 4, 8],
          borderRadius: 4,
          borderWidth: 1,
          position: 'top',
          distance: 10,
        },
        lineStyle: {
          color: dataGroup.lineColor,
        },
      };
    }),
    {
      type: 'line',
      data: [
        { value: [config.minDate, 0], symbol: 'none' },
        // { value: [ new Date().getTime(), 0 ], symbol: 'none' }
      ],
      hoverAnimation: false,
      z: 99,
      label: {
        show: false,
      },
      lineStyle: {
        opacity: 0,
      },
    },
  ],
});
