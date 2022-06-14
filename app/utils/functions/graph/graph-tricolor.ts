import {
  graphBlackColor,
  graphGreyColor,
  graphGreyColorLight,
  graphGridBackgroundColor,
  graphNegativeColor,
  graphNegativeColorLight,
  graphPositiveColor,
  graphPositiveColorLight,
  graphTextColor,
  graphWarningColor,
  graphWarningColorLight,
  GraphXAxisConfig,
  symbolSvgPath,
} from './graph.types';
import { dateFormat } from './graph-utils';
import { RangeValue } from 'types/api';

const zIndex = 100;

// ranges: number[][] --> [ [ min, max ], [ min', max'] ]
const isInsideRange = (value: number, ranges: number[][]) =>
  ranges.filter((range) => value >= range[0] && value <= range[1]).length > 0;

const findColor = (
  value: number,
  positiveRanges: number[][],
  warningRanges: number[][],
  lowNegativeRanges: number[][],
  highNegativeRanges: number[][],
  type: number
) =>
  positiveRanges === null || isInsideRange(value, positiveRanges)
    ? graphPositiveColor
    : isInsideRange(value, warningRanges)
    ? type === 2
      ? graphWarningColor
      : graphGreyColor
    : isInsideRange(value, lowNegativeRanges) ||
      isInsideRange(value, highNegativeRanges)
    ? graphNegativeColor
    : '';

const findColorLight = (
  value: number,
  positiveRanges: number[][],
  warningRanges: number[][],
  lowNegativeRanges: number[][],
  highNegativeRanges: number[][],
  type: number
) =>
  positiveRanges === null || isInsideRange(value, positiveRanges)
    ? graphPositiveColorLight
    : isInsideRange(value, warningRanges)
    ? type === 2
      ? graphWarningColorLight
      : graphGreyColorLight
    : isInsideRange(value, lowNegativeRanges) ||
      isInsideRange(value, highNegativeRanges)
    ? graphNegativeColorLight
    : '';

const createSimpleGraphDataPoint = (value) => ({
  value,
  symbol: 'none',
});

const createLastGraphDataPoint = (
  value,
  positiveRanges: number[][],
  warningRanges: number[][],
  lowNegativeRanges: number[][],
  highNegativeRanges: number[][],
  type: number
) => ({
  value,
  itemStyle: {
    color: findColor(
      value[1],
      positiveRanges,
      warningRanges,
      lowNegativeRanges,
      highNegativeRanges,
      type
    ),
  },
  label: {
    backgroundColor: findColor(
      value[1],
      positiveRanges,
      warningRanges,
      lowNegativeRanges,
      highNegativeRanges,
      type
    ),
    borderColor: findColorLight(
      value[1],
      positiveRanges,
      warningRanges,
      lowNegativeRanges,
      highNegativeRanges,
      type
    ),
    color: graphTextColor,
  },
  symbol: symbolSvgPath,
});

const isSymbolVisible = (
  value: any,
  index: number,
  data: any[],
  positiveRanges: number[][],
  warningRanges: number[][],
  lowNegativeRanges: number[][],
  highNegativeRanges: number[][],
  type: number
) => {
  let isSingleValue = true;

  for (let i = index; i < data.length; i++) {
    isSingleValue = data[i][1] === null;
  }

  return isSingleValue
    ? createLastGraphDataPoint(
        value,
        positiveRanges,
        warningRanges,
        lowNegativeRanges,
        highNegativeRanges,
        type
      )
    : createSimpleGraphDataPoint(value);
};

export const getTricolorGraphLegendOptions = (
  sections: any[],
  max: number,
  type: number
) => ({
  dataZoom: [
    {
      type: 'inside',
      zoomLock: true,
    },
  ],
  xAxis: {
    type: 'category',
    show: false,
    data: [''],
    axisLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
  },
  yAxis: {
    show: false,
    max,
  },
  series: sections.map((section, index) => ({
    type: 'bar',
    data: [
      {
        value: section.value,
        label: {
          formatter: '' + section.formatter,
          fontWeight: 'bold',
          show: index < sections.length - 1,
          backgroundColor: graphGridBackgroundColor,
          color: graphBlackColor,
          padding: [8, 4, 8, 4],
          borderRadius: 4,
          fontSize: 9,
          borderWidth: 1,
          barMaxWidth: 20,
          barWidth: 20,
          barMinWidth: 20,
          borderColor: graphGreyColorLight,
          position: 'top',
          distance: -10,
        },
      },
    ],
    hoverAnimation: false,
    barMaxWidth: 20,
    stack: 'first',
    itemStyle: {
      color:
        section.finding === 'normal'
          ? graphPositiveColor
          : section.finding === 'normal_other'
          ? type === 2
            ? graphWarningColor
            : graphGreyColor
          : graphNegativeColor,
    },
    z: zIndex - index,
  })),
});

export const createBloodSugarFastingMarkLine = (lines: number[]) => ({
  type: 'line',
  markLine: {
    silent: true,
    symbol: 'none',
    lineStyle: {
      color: graphNegativeColor,
    },
    data: lines.map((line) => ({
      yAxis: line,
      label: { show: false },
    })),
  },
});

export const getTricolorGraphOptions = (
  dataset: any[],
  positiveRanges: number[][],
  warningRanges: number[][],
  lowNegativeRanges: number[][],
  highNegativeRanges: number[][],
  marks: any[],
  max: number = null,
  type: number,
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
      show: false,
    },
    axisLabel: {
      margin: 16,
      fontSize: 9,
      color: graphBlackColor,
      fontWeight: 'bold',
      interval: 0,
      formatter: (value, index) => dateFormat(value, index, config.dateRange),
      showMaxLabel: config.dateRange !== RangeValue.all,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    show: false,
    max,
  },
  series: [
    {
      type: 'line',
      data:
        dataset === null
          ? [{ value: [config.minDate, 0], symbol: 'none' }]
          : dataset.map((value, index) =>
              value[1] === null
                ? createSimpleGraphDataPoint(value)
                : index === dataset.length - 1
                ? createLastGraphDataPoint(
                    value,
                    positiveRanges,
                    warningRanges,
                    lowNegativeRanges,
                    highNegativeRanges,
                    type
                  )
                : isSymbolVisible(
                    value,
                    index,
                    dataset,
                    positiveRanges,
                    warningRanges,
                    lowNegativeRanges,
                    highNegativeRanges,
                    type
                  )
            ),
      symbolSize: 16,
      symbolKeepAspect: true,
      connectNulls: true,
      hoverAnimation: false,
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
        color: graphGreyColor,
      },
    },
    ...marks.map((mark) => ({
      type: 'line',
      color: mark.bgColor,
      markArea: {
        silent: true,
        data: [[{ yAxis: mark.data[0] }, { yAxis: mark.data[1] }]],
      },
    })),
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
