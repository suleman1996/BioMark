import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';
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
import { Tip } from 'react-native-tip';
import { IAppState } from 'store/IAppState';

const Index = () => {
  const { colors } = useTheme();
  const chartRef = useRef();
  const lagendChartRef = useRef();
  const styles = Styles(colors);
  const navigation = useNavigation();
  const focused = useIsFocused();

  const { TARGETS } = SCREENS;
  const dispatch = useDispatch();
  const { bloodSugarLogs, latestTarget, drop } = useSelector(
    (state: IAppState) => ({
      bloodSugarLogs: state.home.bloodSugarLogsData,
      latestTarget: state.home.bloodSugarTargets[0],
      drop: state.home.medicalDropDown,
    })
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
  const [hideGraph, setHideGraph] = React.useState(false);

  const [filterOption1] = React.useState([
    { id: 0, title: 'Fasting' },
    { id: 1, title: 'After Meal' },
    { id: 2, title: 'All' },
  ]);
  const [selectedfilterOption1, setSelectedfilterOption1] = React.useState({
    id: 2,
    title: 'All',
  });
  const [filterOption2] = React.useState([
    { id: 1, title: 'mg/dL' },
    { id: 21, title: 'mmol/L' },
  ]);
  const [selectedfilterOption2, setSelectedfilterOption2] = React.useState({
    id: 1,
    title: 'mg/dL',
  });
  const [logData, setLogData] = React.useState([]);
  const [chartState, setChartState] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const bloodSugarGraphData = async () => {
    try {
      setIsLoading(true);
      const result = await userService.getBloodSugarMapData({
        date: selectedValue.title,
        meal: selectedfilterOption1.title,
        unit: selectedfilterOption2.id,
      });
      console.log({ result: result.data.chart.data });
      setChartState(result.data.chart);
      setIsLoading(false);
      setHideGraph(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    bloodSugarGraphData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedValue,
    selectedfilterOption1,
    selectedfilterOption2,
    bloodSugarLogs,
    focused,
  ]);

  React.useEffect(() => {
    dispatch(
      getReduxBloodSugarLogs({
        meal: selectedfilterOption1.title,
        unit: selectedfilterOption2.id,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedfilterOption1, selectedfilterOption2]);

  React.useEffect(() => {
    let arr = [];
    console.log({ latestTarget, log: bloodSugarLogs.log[0], drop });
    bloodSugarLogs?.log?.map((item) => {
      arr.push({
        id: item?.id,
        weight: item?.data_value,
        unit: item?.unit_name,
        date_entry: item?.record_date,
        color:
          item.record_status == 'low'
            ? colors.green
            : item.record_status == 'high'
            ? colors.red
            : null,
      });
    });
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

  const onApplyFilters = (filter1, filter2) => {
    setSelectedfilterOption1(filter1);
    setSelectedfilterOption2(filter2);
    setIsVisible(false);
  };

  return (
    <>
      <HealthProgressFilter
        option1="Logs"
        option2="Unit of Measurements"
        visible={isVisible}
        setIsVisible={setIsVisible}
        filterOption1={filterOption1}
        filterOption2={filterOption2}
        onApplyPress={onApplyFilters}
        values={{ selectedfilterOption1, selectedfilterOption2 }}
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
              <Text style={styles.heading}>
                Blood Sugar ({selectedfilterOption2.title})
              </Text>
              <View style={{ marginLeft: 10 }}>
                <Tip
                  body="Blood sugar also known as blood glucose, is the main sugar found in your blood."
                  bodyStyle={{ color: '#fff' }}
                  tipContainerStyle={{
                    backgroundColor: '#2f6b64',
                    width: '60%',
                  }}
                  overlayOpacity={0.001}
                >
                  <Info color={colors.heading} name="infocirlceo" />
                </Tip>
              </View>
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
          {!hideGraph && (
            <LineGraph
              chartRef={chartRef}
              lagendChartRef={lagendChartRef}
              showLegend={true}
              isLoading={isLoading}
            />
          )}
          <Text
            style={[styles.heading, { alignSelf: 'center', marginTop: 10 }]}
          >
            Displaying Entries: {selectedfilterOption1.title}
          </Text>
          <Logs
            navigate={SCREENS.BLOOD_SUGAR}
            logData={logData}
            onNavigate={() => setHideGraph(true)}
          />
          <View style={{ height: 70 }} />
        </ScrollView>
        <FloatingButton
          onPress={() => navigation.navigate(SCREENS.BLOOD_SUGAR)}
          svg={<BloodSugar height={28} width={28} />}
        />
      </View>
    </>
  );
};

export default Index;
