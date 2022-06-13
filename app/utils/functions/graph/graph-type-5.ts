import {
  graphBlackColor,
  graphGreyColor,
  graphGridBackgroundColor,
  graphNeutralColor,
  graphNeutralColorLight,
  symbolSvgPath,
} from './graph.types';

export const getChart5GraphOptions = (labels: string[], dataset: number[]) => ({
  dataZoom: {
    type: 'inside',
    zoomLock: true,
    // startValue: config.leftBoundary,
    // endValue: config.maxDate,
    filterMode: 'none',
  },
  animation: false,
  xAxis: {
    type: 'category',
    data: labels,
    boundaryGap: ['20%', '20%'],
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
    {
      type: 'line',
      data: dataset.map((value, index) => ({
        value,

        itemStyle: {
          color: graphGreyColor,
        },

        label: {
          show: index === dataset.length - 1,
          backgroundColor: graphNeutralColor,
          borderColor: graphNeutralColorLight,
          color: graphBlackColor,
        },

        symbol: index === dataset.length - 1 ? symbolSvgPath : 'none',
      })),
      symbolSize: 16,
      symbolKeepAspect: true,
      connectNulls: true,
      smooth: true,
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
      symbol: symbolSvgPath,
      lineStyle: {
        color: graphGreyColor,
      },
    },
  ],
});
