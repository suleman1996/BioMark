import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getReduxHba1cLogs } from 'store/home/home-actions';

import Styles from './styles';
import SCREENS from 'navigation/constants/index';

import GraphHeader from 'components/graph-header/index';
import Logs from 'components/health-progress-logs/index';
import FloatingButton from 'components/floating-button/index';

import Target from 'react-native-vector-icons/MaterialCommunityIcons';
import Info from 'react-native-vector-icons/AntDesign';
import Hba1 from 'assets/svgs/diabtes';
import { createHba1CGraph } from 'utils/functions/graph/graph-factory';
import { graphXAxisHba1CConfig } from 'utils/functions/graph/graph-utils';
import {
  getTricolorGraphLegendOptions,
  getTricolorGraphOptions,
} from 'utils/functions/graph/graph-tricolor';
import { Hba1CProgressChart } from 'types/api';
import { userService } from 'services/user-service/user-service';
import LineGraph from 'components/line-graph';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const navigation = useNavigation();
  const { TARGETS } = SCREENS;
  const dispatch = useDispatch();
  const hba1cLogsData = useSelector(
    (state: IAppState) => state.home.hba1cLogsData
  );
  const chartRef = useRef();
  const lagendChartRef = useRef();

  const [chartState, setChartState] = React.useState(null);

  const [headerValue] = React.useState([
    { id: 0, title: '1M', complete: '1 Month' },
    { id: 1, title: '3M', complete: '3 Months' },
    { id: 2, title: '1Y', complete: '1 Year' },
    { id: 3, title: 'All', complete: 'All' },
  ]);
  const [selectedValue, setSelectedValue] = React.useState({
    id: 0,
    title: '1M',
    complete: '1 Month',
  });
  const [logData, setLogData] = React.useState([]);

  React.useEffect(() => {
    dispatch(getReduxHba1cLogs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hBa1CData = async () => {
    try {
      const result = await userService.getHbA1cMapData({
        date: selectedValue.title,
      });
      setChartState(result.data.chart);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    hBa1CData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  React.useEffect(() => {
    let arr = [];
    hba1cLogsData?.log?.map((item) =>
      arr.push({
        id: item?.id,
        weight: item?.data_value,
        unit: item?.unit_name,
        date_entry: item?.record_date,
        color: item?.record_status == 'high' ? colors.dangerRed : colors.green,
      })
    );
    setLogData(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hba1cLogsData]);

  const createChart = (chartData: Hba1CProgressChart) => {
    const graphData = createHba1CGraph(chartData);
    const graphConfig = graphXAxisHba1CConfig(
      0,
      graphData.points.map((p) => p[0])
    );
    const points =
      graphData.points.filter((point) => point[1] !== null).length === 0
        ? null
        : graphData.points;

    const legendChartOptions = getTricolorGraphLegendOptions(
      graphData.sections,
      graphData.overallMax,
      1
    );
    const chartOptions = getTricolorGraphOptions(
      points,
      graphData.positiveRanges,
      graphData.warningRanges,
      graphData.lowNegativeRanges,
      graphData.highNegativeRanges,
      graphData.marks,
      graphData.overallMax,
      1,
      graphConfig
    );

    return { legendChartOptions, chartOptions };
  };

  useEffect(() => {
    if (chartState) {
      const { chartOptions, legendChartOptions } = createChart(chartState);
      setTimeout(() => {
        chartRef.current.setOption(chartOptions);
        lagendChartRef?.current.setOption(legendChartOptions);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartState]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <GraphHeader
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            data={headerValue}
          />
          <View style={styles.headingView}>
            <View style={styles.rowCenter}>
              <Text style={styles.heading}>hbA1c (%)</Text>
              <TouchableOpacity>
                <Info
                  color={colors.heading}
                  style={{ marginLeft: 10 }}
                  name="infocirlceo"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate(TARGETS, { key: 1 })}
            >
              <Target size={24} name="target" color={colors.blue} />
            </TouchableOpacity>
          </View>

          <LineGraph
            chartRef={chartRef}
            lagendChartRef={lagendChartRef}
            showLegend={true}
          />
          <Logs navigate={SCREENS.HBA1C} logData={logData} />
        </ScrollView>
        <FloatingButton svg={<Hba1 height={28} width={28} />} />
      </View>
    </>
  );
};

export default Index;
