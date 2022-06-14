import {
  BloodSugarProgressChart,
  ResultSummaryChartSection,
  ResultSummaryChartSectionRange,
} from 'types/api';

import { convertDate } from 'utils/functions/graph/graph-utils';

import { GraphFinding } from 'utils/functions/graph/graph.types';

import {
  createMarks,
  defaultRange,
  defaultRanges,
  defaultSection,
} from 'utils/functions/graph/graph-factory';

export class BloodSugarGraphFactory {
  static createBloodSugarGraph = (
    chartData: BloodSugarProgressChart,
    isMealAll: boolean,
    isMgDl: boolean
  ) => {
    const ppgTo = parseFloat(chartData.target.ppg_to);

    const points = chartData.data
      .map((point) => [
        convertDate(point.date),
        point.value !== null ? point.value : null, // redundant
      ])
      .reverse();

    let datasetMax = Math.max(...chartData.data.map((a) => a.value));

    if (isMealAll) {
      datasetMax = Math.max(...[datasetMax, ppgTo]);
    }

    datasetMax += isMgDl ? 2 : 15;

    return {
      points,
      ...BloodSugarGraphFactory.findSectionsAndMarks(
        chartData,
        isMealAll,
        datasetMax,
        ppgTo
      ),
    };
  };

  private static findSectionsAndMarks = (
    chartData: BloodSugarProgressChart,
    isMealAll: boolean,
    datasetMax: number,
    ppgTo: number
  ) => {
    const chartType = 1;

    const lowSection = defaultSection(chartData.sections, GraphFinding.low);
    const normalSection = defaultSection(
      chartData.sections,
      GraphFinding.normal
    );
    const highSection = defaultSection(chartData.sections, GraphFinding.high);

    const lowRange = defaultRange(lowSection);
    const normalRange = defaultRange(normalSection);
    const highRange = defaultRange(highSection);

    const marks = createMarks(
      chartType,
      datasetMax,
      chartData.sections as ResultSummaryChartSection[]
    );
    const overallMax =
      marks.length > 0
        ? marks.filter((mark) => mark.finding === GraphFinding.high)[0].data[1]
        : 0;

    let sections;

    if (isMealAll) {
      sections = BloodSugarGraphFactory.createBloodSugarSectionsAll(
        overallMax,
        lowRange,
        normalRange,
        highRange,
        ppgTo
      );
    } else {
      sections = BloodSugarGraphFactory.createStandardBloodSugarSections(
        overallMax,
        lowRange,
        normalRange,
        highRange
      );
    }

    const positiveRanges: number[][] = defaultRanges(
      marks,
      GraphFinding.normal
    );
    const warningRanges: number[][] = defaultRanges(
      marks,
      GraphFinding.normal_other
    );
    const lowNegativeRanges: number[][] = defaultRanges(
      marks,
      GraphFinding.low
    );
    const highNegativeRanges: number[][] = defaultRanges(
      marks,
      GraphFinding.high
    );

    return {
      positiveRanges,
      warningRanges,
      lowNegativeRanges,
      highNegativeRanges,
      marks,
      overallMax,
      sections,
    };
  };

  private static createBloodSugarSectionsAll = (
    max: number,
    low: ResultSummaryChartSectionRange,
    normal: ResultSummaryChartSectionRange,
    high: ResultSummaryChartSectionRange,
    ppgTo: number
  ) =>
    ppgTo === low.max || ppgTo === normal.max
      ? BloodSugarGraphFactory.createStandardBloodSugarSections(
          max,
          low,
          normal,
          high
        )
      : ppgTo < low.max
      ? BloodSugarGraphFactory.createLowPpgBloodSugarSections(
          max,
          low,
          normal,
          high,
          ppgTo
        )
      : ppgTo < normal.max
      ? BloodSugarGraphFactory.createNormalPpgBloodSugarSections(
          max,
          low,
          normal,
          high,
          ppgTo
        )
      : BloodSugarGraphFactory.createHighPpgBloodSugarSections(
          max,
          low,
          normal,
          high,
          ppgTo
        );

  private static createStandardBloodSugarSections = (
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
      value: Math.max(max, high.min) - high.min,
      formatter: '',
      finding: GraphFinding.high,
    },
  ];

  private static createLowPpgBloodSugarSections = (
    max: number,
    low: ResultSummaryChartSectionRange,
    normal: ResultSummaryChartSectionRange,
    high: ResultSummaryChartSectionRange,
    ppgTo: number
  ) => [
    {
      value: ppgTo,
      formatter: ppgTo,
      finding: GraphFinding.low,
    },
    {
      value: low.max - ppgTo,
      formatter: low.max,
      finding: GraphFinding.low,
    },
    {
      value: normal.max - normal.min,
      formatter: normal.max,
      finding: GraphFinding.normal,
    },
    {
      value: Math.max(max, high.min) - high.min,
      formatter: '',
      finding: GraphFinding.high,
    },
  ];

  private static createNormalPpgBloodSugarSections = (
    max: number,
    low: ResultSummaryChartSectionRange,
    normal: ResultSummaryChartSectionRange,
    high: ResultSummaryChartSectionRange,
    ppgTo: number
  ) => [
    {
      value: +low.max,
      formatter: low.max,
      finding: GraphFinding.low,
    },
    {
      value: ppgTo - low.max,
      formatter: ppgTo,
      finding: GraphFinding.normal,
    },
    {
      value: normal.max - ppgTo,
      formatter: normal.max,
      finding: GraphFinding.normal,
    },
    {
      value: Math.max(max, high.min) - high.min,
      formatter: '',
      finding: GraphFinding.high,
    },
  ];

  private static createHighPpgBloodSugarSections = (
    max: number,
    low: ResultSummaryChartSectionRange,
    normal: ResultSummaryChartSectionRange,
    high: ResultSummaryChartSectionRange,
    ppgTo: number
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
      value: ppgTo - normal.max,
      formatter: ppgTo,
      finding: GraphFinding.high,
    },
    {
      value: Math.max(max, ppgTo) - ppgTo,
      formatter: '',
      finding: GraphFinding.high,
    },
  ];
}
