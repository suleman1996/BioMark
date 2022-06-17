import {
  Hba1CProgressChart,
  ResultSummaryChartPayload,
  ResultSummaryChartSection,
  ResultSummaryChartSectionRange,
} from 'types/api';
import {
  GraphFinding,
  graphGreyColorLight,
  graphNegativeColorLight,
  graphPositiveColorLight,
  graphWarningColorLight,
} from './graph.types';

import moment from 'moment';
import { convertDate } from './graph-utils';

export const findNumberLength = (num: number): number => {
  let length = 0;
  let n = Math.abs(num);

  do {
    n /= 10;
    length++;
  } while (n >= 1);

  return length;
};

export const defaultRange = (section): { min: number; max: number } =>
  section ? section.range : { min: 0, max: 0 };

export const defaultSection = (
  sections,
  finding: GraphFinding
): ResultSummaryChartSection =>
  sections.filter((s) => s.finding === finding)[0];

export const defaultRanges = (marks, finding: GraphFinding): number[][] =>
  marks.filter((range) => range.finding === finding).map((range) => range.data);

export const findMax = (dataset: number[]): number => {
  // find the max value of the dataset
  const max = Math.max(...dataset);

  // If we get Infinity or NaN then return zero
  if (!Number.isFinite(max) || Number.isNaN(max)) {
    return 0;
  }

  // find the number size
  let numberSize = findNumberLength(max);

  if (+max.toString().split('.')[0] === 0) {
    // arbitrary 1 for number with 0.xx
    return 1.2;
  }

  if (numberSize === 1) {
    numberSize = Math.floor(max);

    // between 1 and 9 just get the nearest based on that
    return Math.ceil(max / (0.1 * (numberSize - 0.1))) * (0.1 * numberSize);
  }

  // find the nearest integer based on the 10th section
  return Math.ceil(max / (0.5 * (numberSize - 0.5))) * (0.5 * numberSize);
};

export const findMaxSimple = (a: number, b: number) => Math.max(a, b);

export const findBgColorByFinding = (
  chartType: number,
  finding: string
): string => {
  switch (finding) {
    case GraphFinding.normal_other:
      return chartType === 2 ? graphWarningColorLight : graphGreyColorLight;
    case GraphFinding.low:
    case GraphFinding.high:
      return graphNegativeColorLight;
    case GraphFinding.normal:
      return graphPositiveColorLight;
    default:
      return graphGreyColorLight;
  }
};

export const findMark = (
  chartType: number,
  max: number,
  section: ResultSummaryChartSection
) => {
  switch (chartType) {
    case 1:
    case 2:
    case 4:
    case 10:
      if (section.finding === GraphFinding.high) {
        return [
          +section.range.min,
          findMaxSimple(max, findMax([+section.range.min])),
        ];
      } else {
        return [+section.range.min, +section.range.max];
      }
    case 3:
      if (section.finding === GraphFinding.normal) {
        return [
          +section.range.min,
          findMaxSimple(max, findMax([+section.range.min])),
        ];
      } else {
        return [+section.range.min, +section.range.max];
      }
  }
};

// low (RED) - normal (GREEN) - high (RED)
export const createSectionType1 = (
  max: number,
  low: ResultSummaryChartSectionRange,
  normal: ResultSummaryChartSectionRange,
  high: ResultSummaryChartSectionRange
) => [
  {
    value: +low.max,
    formatter: low.max,
    finding: GraphFinding.low,
  },
  {
    value: normal.max - normal.min,
    formatter: normal.max,
    finding: GraphFinding.normal,
  },
  {
    value: findMaxSimple(max, high.min) - high.min,
    formatter: '',
    finding: GraphFinding.high,
  },
];

// normal (GREEN) - warning (YELLOW) - high (RED)
export const createSectionType2 = (
  max: number,
  normal: ResultSummaryChartSectionRange,
  warning: ResultSummaryChartSectionRange,
  high: ResultSummaryChartSectionRange
) => [
  {
    value: +normal.max,
    formatter: normal.max,
    finding: GraphFinding.normal,
  },
  {
    value: warning.max - warning.min,
    formatter: warning.max,
    finding: GraphFinding.normal_other,
  },
  {
    value: findMaxSimple(max, high.min) - high.min,
    formatter: '',
    finding: GraphFinding.high,
  },
];

// low (RED) - normal (GREEN)
export const createSectionType3 = (
  max: number,
  low: ResultSummaryChartSectionRange,
  normal: ResultSummaryChartSectionRange
) => [
  {
    value: +low.max,
    formatter: low.max,
    finding: GraphFinding.low,
  },
  {
    value: findMaxSimple(max, normal.min) - normal.min,
    formatter: '',
    finding: GraphFinding.normal,
  },
];

// normal (GREEN) - high (RED)
export const createSectionType4 = (
  max: number,
  normal: ResultSummaryChartSectionRange,
  high: ResultSummaryChartSectionRange
) => [
  {
    value: +normal.max,
    formatter: normal.max,
    finding: GraphFinding.normal,
  },
  {
    value: findMaxSimple(max, high.min) - high.min,
    formatter: '',
    finding: GraphFinding.high,
  },
];

// low (RED) - normal (GREY) - high (RED)
export const createSectionType10 = (
  max: number,
  low: ResultSummaryChartSectionRange,
  warning: ResultSummaryChartSectionRange,
  high: ResultSummaryChartSectionRange
) => [
  {
    value: +low.max,
    formatter: low.max,
    finding: GraphFinding.low,
  },
  {
    value: warning.max - warning.min,
    formatter: warning.max,
    finding: GraphFinding.normal_other,
  },
  {
    value: findMaxSimple(max, high.min) - high.min,
    formatter: '',
    finding: GraphFinding.high,
  },
];

export const createHba1CSections = (
  max: number,
  normal: ResultSummaryChartSectionRange,
  high: ResultSummaryChartSectionRange
) => [
  {
    value: +normal.max,
    formatter: normal.max,
    finding: GraphFinding.normal,
  },
  {
    value: findMaxSimple(max, high.min) - high.min,
    formatter: '',
    finding: GraphFinding.high,
  },
];

export const createSectionsBaseOnChartType = (
  chartType: number,
  max: number,
  low: ResultSummaryChartSectionRange,
  high: ResultSummaryChartSectionRange,
  normal: ResultSummaryChartSectionRange,
  warning: ResultSummaryChartSectionRange
) => {
  switch (chartType) {
    case 1:
      return createSectionType1(max, low, normal, high);
    case 2:
      return createSectionType2(max, normal, warning, high);
    case 3:
      return createSectionType3(max, low, normal);
    case 4:
      return createSectionType4(max, normal, high);
    case 10:
      return createSectionType10(max, low, warning, high);
  }
};

export const createMarks = (
  chartType: number,
  datasetMax: number,
  sections: ResultSummaryChartSection[]
) =>
  sections.map((section) => ({
    finding: section.finding,
    bgColor: findBgColorByFinding(chartType, section.finding),
    data: findMark(chartType, datasetMax, section),
  }));

export const createResultGraph = (chartData: ResultSummaryChartPayload) => {
  const chartType = chartData.chart_type;

  const labels = chartData.results
    .map((point) => moment(point.date_of_test).format('DD/MM'))
    .reverse();
  const dataset = chartData.results
    .map((point) => +point.observation_value)
    .reverse();

  const datasetMax = findMax(dataset);

  const lowSection = chartData.sections.filter(
    (s) => s.finding === GraphFinding.low
  )[0];
  const normalSection = chartData.sections.filter(
    (s) => s.finding === GraphFinding.normal
  )[0];
  const warningSection = chartData.sections.filter(
    (s) => s.finding === GraphFinding.normal_other
  )[0];
  const highSection = chartData.sections.filter(
    (s) => s.finding === GraphFinding.high
  )[0];

  const lowRange = lowSection ? lowSection.range : null;
  const normalRange = normalSection ? normalSection.range : null;
  const warningRange = warningSection ? warningSection.range : null;
  const highRange = highSection ? highSection.range : null;

  const marks = createMarks(chartType, datasetMax, chartData.sections);
  let overallMax: number;
  switch (chartType) {
    case 1:
    case 2:
    case 4:
    case 10:
      overallMax = marks.filter((mark) => mark.finding === GraphFinding.high)[0]
        .data[1];
      break;
    case 3:
      overallMax = marks.filter(
        (mark) => mark.finding === GraphFinding.normal
      )[0].data[1];
      break;
  }

  const sections = createSectionsBaseOnChartType(
    chartType,
    overallMax,
    lowRange,
    highRange,
    normalRange,
    warningRange
  );

  const positiveRanges: number[][] = marks
    .filter((range) => range.finding === GraphFinding.normal)
    .map((range) => range.data);
  const warningRanges: number[][] = marks
    .filter((range) => range.finding === GraphFinding.normal_other)
    .map((range) => range.data);
  const lowNegativeRanges: number[][] = marks
    .filter((range) => range.finding === GraphFinding.low)
    .map((range) => range.data);
  const highNegativeRanges: number[][] = marks
    .filter((range) => range.finding === GraphFinding.high)
    .map((range) => range.data);

  return {
    labels,
    dataset,
    positiveRanges,
    warningRanges,
    lowNegativeRanges,
    highNegativeRanges,
    marks,
    overallMax,
    sections,
  };
};

export const createHba1CGraph = (chartData: Hba1CProgressChart) => {
  const chartType = 4;

  const points = chartData.data
    .map((point) => [
      convertDate(point.date),
      point.value !== null ? point.value : null,
    ])
    .reverse();

  const datasetMax = findMax(points.map((p) => p[1]));

  const normalSection = chartData.sections.filter(
    (s) => s.finding === GraphFinding.normal
  )[0];
  const highSection = chartData.sections.filter(
    (s) => s.finding === GraphFinding.high
  )[0];

  const normalRange = normalSection ? normalSection.range : { min: 0, max: 0 };
  const highRange = highSection ? highSection.range : { min: 0, max: 0 };

  const marks = createMarks(
    chartType,
    datasetMax,
    chartData.sections as ResultSummaryChartSection[]
  );
  const overallMax =
    marks.length > 0
      ? marks.filter((mark) => mark.finding === GraphFinding.high)[0].data[1]
      : 0;

  const sections = createHba1CSections(overallMax, normalRange, highRange);

  const positiveRanges: number[][] = marks
    .filter((range) => range.finding === GraphFinding.normal)
    .map((range) => range.data);
  const warningRanges: number[][] = marks
    .filter((range) => range.finding === GraphFinding.normal_other)
    .map((range) => range.data);
  const lowNegativeRanges: number[][] = marks
    .filter((range) => range.finding === GraphFinding.low)
    .map((range) => range.data);
  const highNegativeRanges: number[][] = marks
    .filter((range) => range.finding === GraphFinding.high)
    .map((range) => range.data);

  return {
    points,
    positiveRanges,
    warningRanges,
    lowNegativeRanges,
    highNegativeRanges,
    marks,
    overallMax,
    sections,
  };
};

export const createGraph5 = (chartData: ResultSummaryChartPayload) => {
  const labels = chartData.results
    .map((point) => moment(point.date_of_test).format('DD/MM'))
    .reverse();
  const dataset = chartData.results
    .map((point) => +point.observation_value)
    .reverse();

  return {
    labels,
    dataset,
  };
};
