import { View, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';

import { useTheme } from 'react-native-paper';
import { ResultSummaryChartPayload } from 'types/api';

import GraphHeader from 'components/graph-header/index';
import Styles from './styles';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import DropDown from 'react-native-paper-dropdown';
import LineGraph from 'components/line-graph';
import {
  createGraph5,
  createResultGraph,
} from 'utils/functions/graph/graph-factory';
import {
  getResultGraphLegendOptions,
  getResultGraphOptions,
} from 'utils/functions/graph/graph-result';
import { getChart5GraphOptions } from 'utils/functions/graph/graph-type-5';
import { useIsFocused } from '@react-navigation/native';
import { healthRecordServices } from 'services/health-record-service';
import { useTranslation } from 'react-i18next';

const Charts = ({ biomarker_id, provider }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const chartRef = useRef();
  const lagendChartRef = useRef();
  const styles = Styles(colors);
  const focused = useIsFocused();

  const [headerValue] = React.useState([
    { id: 0, title: '90', complete: '90 Days', date: '90' },
    { id: 1, title: 'Last Year', complete: 'Last Year', date: 'last_year' },
    { id: 3, title: 'All', complete: 'All', date: 'all' },
  ]);
  const [selectedValue, setSelectedValue] = React.useState({
    id: 1,
    title: 'Last Year',
    complete: 'Last Year',
    date: 'last_year',
  });
  const [showDropDown, setShowDropDown] = React.useState(false);
  const reportOptions = [{ value: 0, label: provider[0]?.name }];
  const [selectedReport] = React.useState(reportOptions[0]?.value);
  const [chartData, setChartData] = React.useState();
  const [isLoading, setIsLoading] = React.useState();
  const [render, setRender] = React.useState(0);

  const getReportChartData = async (biomarker) => {
    try {
      setIsLoading(render !== 0);
      const result = await healthRecordServices.getResultOverViewChartData(
        biomarker,
        selectedValue?.date,
        provider[0]?.id
      );
      console.log(result.data);
      setChartData(result.data);
      setIsLoading(false);
      if (render === 0) {
        setRender(1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    console.log('123123123123', biomarker_id);
    getReportChartData(biomarker_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [biomarker_id, render, selectedValue]);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, focused]);

  useEffect(() => {
    console.log('helloooooooo start');
    console.log(!!chartData);
    console.log(!!chartRef);
    console.log('helloooooooo end');

    if (chartData && chartRef.current) {
      if (chartData?.chart_type === 5) {
        const chartOptions = createChart5(chartData);
        setTimeout(() => {
          chartRef?.current?.setOption(chartOptions);
        }, 10);
      } else {
        const { chartOptions, legendChartOptions } = createGraph(chartData);
        console.log('YOYOYOYOYOYO', {
          chartOptions,
          legendChartOptions,
        });
        setTimeout(() => {
          chartRef?.current?.setOption(chartOptions);
          lagendChartRef?.current?.setOption(legendChartOptions);
        }, 10);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData, focused, chartRef]);

  const createGraph = (chart: ResultSummaryChartPayload) => {
    const graphData = createResultGraph(chart);

    const legendOptions = getResultGraphLegendOptions(
      graphData.labels,
      graphData.sections,
      graphData.overallMax,
      chart.chart_type
    );

    const options = getResultGraphOptions(
      graphData.labels,
      graphData.dataset,
      graphData.positiveRanges,
      graphData.warningRanges,
      graphData.lowNegativeRanges,
      graphData.highNegativeRanges,
      graphData.marks,
      graphData.overallMax,
      chart.chart_type
    );
    return { chartOptions: options, legendChartOptions: legendOptions };
  };

  const createChart5 = (chart: ResultSummaryChartPayload) => {
    const graphData = createGraph5(chart);

    return getChart5GraphOptions(graphData.labels, graphData.dataset);
  };

  const RangesView = ({ item }) => (
    <View style={styles.rangesView}>
      <View style={styles.leftView}>
        <View
          style={[
            styles.rangesTitleView,
            {
              backgroundColor:
                item?.simple_label == 'N' ? colors.greenDark : colors.dangerRed,
            },
          ]}
        >
          <Text style={styles.rangesTitle}>{item?.simple_label}</Text>
        </View>
      </View>
      <View style={styles.centerView}>
        <Text style={styles.referanceStatus}>{item?.long_label}</Text>
      </View>
      <View style={styles.rightView}>
        <Text style={styles.referanceValue}>{item?.range_label}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <GraphHeader
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        data={headerValue}
      />
      <Text style={styles.headingChart}>
        {chartData?.name} {chartData?.unit}
      </Text>
      {focused && (
        <LineGraph
          chartRef={chartRef}
          lagendChartRef={lagendChartRef}
          showLegend={chartData?.chart_type !== 5 ? true : false}
          isLoading={isLoading}
        />
      )}
      <Text style={styles.headingChart}>
        {t('pages.summaryChart.sources1')} {provider.length}{' '}
        {t('pages.summaryChart.sources2')}
      </Text>
      <DropDown
        mode={'flat'}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={selectedReport}
        setValue={(itemValue) => {
          console.log('Here is the value ', itemValue);
        }}
        list={reportOptions}
        inputProps={{
          style: {
            width: '100%',
            height: heightToDp(5),
            // flex: 1,
            borderRadius: widthToDp(2),
            maxHeight: heightToDp(6.5),
          },
          underlineColor: '#fff',
        }}
        activeColor={colors.heading}
      />
      {chartData?.chart_type !== 5 && (
        <>
          <Text style={[styles.headingChart, { marginVertical: 20 }]}>
            {t('pages.summaryChart.referenceRanges')}
          </Text>
          {chartData?.sections.map((item) => (
            <RangesView item={item} />
          ))}
        </>
      )}
    </View>
  );
};

export default Charts;
