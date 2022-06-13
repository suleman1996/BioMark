import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getReduxBloodSugarLogs } from 'store/home/home-actions';

import Styles from './styles';
import SCREENS from 'navigation/constants/index';

import GraphHeader from 'components/graph-header/index';
import Filter from 'assets/svgs/filter';
import HealthProgressFilter from 'components/health-progress-filter/index';
import Logs from '../../../../../../components/health-progress-logs/index';
import FloatingButton from '../../../../../../components/floating-button/index';

import Target from 'react-native-vector-icons/MaterialCommunityIcons';
import Info from 'react-native-vector-icons/AntDesign';
import BloodSugar from '../../../../../../assets/svgs/diabtes';
import LineGraph from '../../../../../../components/line-graph/index';
import { userService } from 'services/user-service/user-service';
import {
  BloodSugarProgressChart,
  defaultBloodSugarProgressChartFilters,
} from 'types/api';
import { graphXAxisConfig } from 'utils/functions/graph/graph-utils';
import {
  createBloodSugarFastingMarkLine,
  getTricolorGraphLegendOptions,
  getTricolorGraphOptions,
} from 'utils/functions/graph/graph-tricolor';
import { BloodSugarGraphFactory } from './factory';

const Index = () => {
  const { colors } = useTheme();
  const chartRef = useRef();
  const lagendChartRef = useRef();
  const styles = Styles(colors);
  const navigation = useNavigation();
  const { TARGETS } = SCREENS;
  const dispatch = useDispatch();
  const bloodSugarLogs = useSelector(
    (state: IAppState) => state.home.bloodSugarLogsData
  );

  const [headerValue] = React.useState([
    { id: 0, title: '1D', complete: '1 Day' },
    { id: 1, title: '7D', complete: '7 Days' },
    { id: 2, title: '1M', complete: '1 Month' },
    { id: 3, title: '3M', complete: '3 Months' },
    { id: 4, title: '1Y', complete: '1 Year' },
    { id: 5, title: 'All', complete: 'All' },
  ]);
  const [selectedValue, setSelectedValue] = React.useState({
    id: 0,
    title: '1D',
    complete: '1 Day',
  });

  const [isVisible, setIsVisible] = React.useState(false);

  const [filterOption1] = React.useState([
    { id: 0, title: 'Fasting' },
    { id: 1, title: 'After Meal' },
    { id: 2, title: 'All' },
  ]);
  const [selectedfilterOption1, setSelectedfilterOption1] = React.useState({
    id: 0,
    title: 'Fasting',
  });
  const [filterOption2] = React.useState([
    { id: 0, title: 'mg/dL' },
    { id: 1, title: 'mmol/L' },
  ]);
  const [selectedfilterOption2, setSelectedfilterOption2] = React.useState({
    id: 0,
    title: 'mg/dL',
  });
  const [logData, setLogData] = React.useState([]);
  const [chartState, setChartState] = React.useState(null);

  const bloodSugarGraphData = async () => {
    try {
      const result = await userService.getBloodSugarMapData({
        date: selectedValue.title,
      });
      setChartState(result.data.chart);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    bloodSugarGraphData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  React.useEffect(() => {
    dispatch(getReduxBloodSugarLogs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  React.useEffect(() => {
    let arr = [];
    bloodSugarLogs?.log?.map((item) =>
      arr.push({
        id: item?.id,
        weight: item?.data_value,
        unit: item?.unit_name,
        date_entry: item?.record_date,
      })
    );
    setLogData(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bloodSugarLogs]);

  enum MealTypeUnit {
    beforeBreakfast = 'Before Breakfast',
    afterBreakfast = 'After Breakfast',
    beforeLunch = 'Before Lunch',
    afterLunch = 'After Lunch',
    beforeDinner = 'Before Dinner',
    afterDinner = 'After Dinner',
    bedtime = 'Bedtime',
    afterMeal = 'After Meal',
    fasting = 'Fasting',
    all = 'All',
  }
  enum BloodSugarUnitId {
    mgDl = 1,
    mmolL = 21,
  }

  const createChart = (chartData: BloodSugarProgressChart) => {
    const chartParams = { ...defaultBloodSugarProgressChartFilters };
    const isMealAll = chartParams.meal === MealTypeUnit.all;

    const graphData = BloodSugarGraphFactory.createBloodSugarGraph(
      chartData,
      isMealAll,
      chartParams.unit === BloodSugarUnitId.mgDl
    );

    const graphConfig = graphXAxisConfig(
      0,
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

  useEffect(() => {
    if (chartState) {
      const { chartOptions, legendChartOptions } = createChart(chartState);
      setTimeout(() => {
        chartRef.current.setOption(chartOptions);
        lagendChartRef?.current.setOption(legendChartOptions);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartState]);

  return (
    <>
      <HealthProgressFilter
        option1="Logs"
        option2="Unit of Measurements"
        visible={isVisible}
        setIsVisible={setIsVisible}
        filterOption1={filterOption1}
        filterOption2={filterOption2}
        selectedfilterOption1={selectedfilterOption1}
        setSelectedfilterOption1={setSelectedfilterOption1}
        selectedfilterOption2={selectedfilterOption2}
        setSelectedfilterOption2={setSelectedfilterOption2}
      />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <GraphHeader
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            data={headerValue}
          />
          <View style={styles.headingView}>
            <View style={styles.rowCenter}>
              <Text style={styles.heading}>Blood Sugar (mg/dL)</Text>
              <TouchableOpacity>
                <Info
                  color={colors.heading}
                  style={{ marginLeft: 10 }}
                  name="infocirlceo"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rowCenter}>
              <TouchableOpacity
                onPress={() => navigation.navigate(TARGETS, { key: 0 })}
              >
                <Target size={24} name="target" color={colors.blue} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => setIsVisible(!isVisible)}
              >
                <Filter fill={colors.heading} />
              </TouchableOpacity>
            </View>
          </View>
          <LineGraph
            chartRef={chartRef}
            lagendChartRef={lagendChartRef}
            showLegend={true}
          />
          <Text
            style={[styles.heading, { alignSelf: 'center', marginTop: 10 }]}
          >
            Displaying Entries: All
          </Text>
          <Logs navigate={SCREENS.BLOOD_SUGAR} logData={logData} />
          <View style={{ height: 70 }} />
        </ScrollView>
        <FloatingButton svg={<BloodSugar height={28} width={28} />} />
      </View>
    </>
  );
};

export default Index;
