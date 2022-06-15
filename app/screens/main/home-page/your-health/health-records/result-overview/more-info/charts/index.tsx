import { View, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';

import { useTheme } from 'react-native-paper';
import {
  BloodSugarProgressChart,
  defaultBloodSugarProgressChartFilters,
} from 'types/api';

import GraphHeader from 'components/graph-header/index';
import LineGraph from 'components/line-graph/index';
import Styles from './styles';
import fonts from 'assets/fonts';
import { userService } from 'services/user-service/user-service';

const Charts = () => {
  const { colors } = useTheme();
  const chartRef = useRef();
  const lagendChartRef = useRef();
  const styles = Styles(colors);

  const [headerValue] = React.useState([
    { id: 0, title: '90', complete: '90 Days' },
    { id: 1, title: 'Last Year', complete: 'Last Year' },
    { id: 3, title: 'All', complete: 'All' },
  ]);
  const [selectedValue, setSelectedValue] = React.useState({
    id: 0,
    title: '90',
    complete: '1 Day',
  });
  const [chartState] = React.useState(null);

  const RangesView = () => (
    <View style={{ flexDirection: 'row', marginVertical: 3 }}>
      <View
        style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}
      >
        <View
          style={{
            backgroundColor: colors.danger,
            paddingHorizontal: 15,
            borderRadius: 12,
            paddingVertical: 0.5,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.regular,
              color: colors.white,
              fontSize: 11,
            }}
          >
            H
          </Text>
        </View>
      </View>
      <View style={{ width: '15%', alignItems: 'center' }}>
        <Text style={{ fontFamily: fonts.bold, color: colors.heading }}>
          High
        </Text>
      </View>
      <View style={{ width: '60%', alignItems: 'flex-end' }}>
        {/* <Text>>116 umol/L</Text> */}
      </View>
    </View>
  );

  const createChart = (chartData: BloodSugarProgressChart) => {
    const chartParams = { ...defaultBloodSugarProgressChartFilters };
    const isMealAll = chartParams.meal === MealTypeUnit.all;

    const graphData = BloodSugarGraphFactory.createBloodSugarGraph(
      chartData,
      isMealAll,
      chartParams.unit === BloodSugarUnitId.mgDl
    );

    const graphConfig = graphXAxisConfig(
      selectedValue.title,
      graphData.points.map((p) => p[0])
    );

    const legendChartOptions = getTricolorGraphLegendOptions(
      graphData.sections,
      graphData.overallMax,
      1
    );

    let chartOptions = getTricolorGraphOptions(
      graphData.points,
      graphData.positiveRanges,
      graphData.warningRanges,
      graphData.lowNegativeRanges,
      graphData.highNegativeRanges,
      graphData.marks,
      graphData.overallMax,
      1,
      graphConfig
    );

    if (isMealAll) {
      chartOptions = {
        ...chartOptions,
        series: chartOptions.series.concat(
          createBloodSugarFastingMarkLine([
            chartData.target === null ? 0 : parseFloat(chartData.target.ppg_to),
          ])
        ),
      };
    }

    return { chartOptions, legendChartOptions };
  };

  const bloodSugarGraphData = async () => {
    try {
      const result = userService.getResultOverViewChartData();
      console.log('chart data ', result.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    bloodSugarGraphData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chartState && chartRef.current) {
      const { chartOptions, legendChartOptions } = createChart(chartState);
      setTimeout(() => {
        chartRef?.current?.setOption(chartOptions);
        lagendChartRef?.current?.setOption(legendChartOptions);
      }, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartState]);

  return (
    <View style={styles.container}>
      <GraphHeader
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        data={headerValue}
      />
      <Text style={styles.headingChart}>Urea (mmol/L)</Text>
      <LineGraph
        chartRef={chartRef}
        lagendChartRef={lagendChartRef}
        showLegend={true}
      />
      <Text style={styles.headingChart}>Results available from 1 source</Text>

      <Text style={styles.headingChart}>REFERENCE RANGES</Text>
      <RangesView />
      <RangesView />
      <RangesView />
    </View>
  );
};

export default Charts;
