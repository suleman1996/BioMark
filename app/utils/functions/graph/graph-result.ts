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
  symbolSvgPath,
} from './graph.types';

const zIndex = 100;

// the legend graph (bar one) needs to have a fixed length
// const fillMinimumLength = (labels: string[]) => {
//   let c = 0;
//   let l = labels.length;
//   const tmp = labels.map((a) => a);

//   do {
//     tmp.push('a' + c);
//     c++;
//     l++;
//   } while (l < 14);

//   return tmp;
// };

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

export const getResultGraphLegendOptions = (
  labels: string[],
  sections: any[], // TODO type
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

export const getResultGraphOptions = (
  labels: string[],
  dataset: any[], // TODO type
  positiveRanges: number[][],
  warningRanges: number[][],
  lowNegativeRanges: number[][],
  highNegativeRanges: number[][],
  marks: any[], // TODO type
  max: number = null,
  type: number
) => ({
  dataZoom: [
    {
      start: labels.length >= 7 ? (labels.length >= 14 ? 66 : 50) : 0,
      end: 100,
      type: 'inside',
      zoomLock: true,
    },
  ],
  xAxis: {
    type: 'category',
    boundaryGap: ['20%', '20%'],
    data: labels,
    axisLine: {
      show: false,
    },
    axisLabel: {
      margin: 16,
      fontSize: 9,
      color: graphBlackColor,
      fontWeight: 'bold',
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
      data: dataset.map((value, index) => ({
        value,

        itemStyle: {
          color: findColor(
            value,
            positiveRanges,
            warningRanges,
            lowNegativeRanges,
            highNegativeRanges,
            type
          ),
        },

        label: {
          show: index === dataset.length - 1,
          backgroundColor: findColor(
            value,
            positiveRanges,
            warningRanges,
            lowNegativeRanges,
            highNegativeRanges,
            type
          ),
          borderColor: findColorLight(
            value,
            positiveRanges,
            warningRanges,
            lowNegativeRanges,
            highNegativeRanges,
            type
          ),
          color: graphTextColor,
        },

        symbol: index === dataset.length - 1 ? symbolSvgPath : 'none',
      })),
      symbolSize: 16,
      symbolKeepAspect: true,
      connectNulls: true,
      hoverAnimation: false,
      smooth: true,
      z: 100,
      label: {
        fontWeight: 'bold',
        padding: [4, 8, 4, 8],
        borderRadius: 4,
        borderWidth: 1,
        position: 'top',
        distance: 10,
      },
      lineStyle: {
        color: '#6e7d78',
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
  ],
});
