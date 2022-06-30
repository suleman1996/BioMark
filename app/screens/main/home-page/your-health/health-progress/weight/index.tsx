import { ScrollView, TouchableOpacity, View, BackHandler } from 'react-native';
import React, { useRef } from 'react';

import Styles from './styles';
import SCREENS from 'navigation/constants/index';
import { Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getReduxWeightLogs } from 'store/home/home-actions';

import GraphHeader from 'components/graph-header/index';
import LineGraph from 'components/line-graph/index';
import Filter from '../../..//../../../assets/svgs/filter';
import HealthProgressFilter from 'components/health-progress-filter/index';
import Logs from 'components/health-progress-logs/index';

import FloatingButton from 'components/floating-button/index';
import Person from 'assets/svgs/Bmi';

import {
  convertDataset,
  createGraphDataPoints,
  getGraphOptions,
} from 'utils/functions/graph/graph-monocromatic';
import {
  convertDate,
  createGraphDataPointOptions,
  graphXAxisConfig,
} from 'utils/functions/graph/graph-utils';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { healthProgressServices } from 'services/health-progress-servive';
import { navigate } from 'services/nav-ref';
// import HealthRecord from '../../health-records';

const Index = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = Styles(colors);
  let chartRef = useRef();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const weightLogs = useSelector(
    (state: IAppState) => state.home.weightLogsData
  );

  const [chartState, setChartState] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hideGraph, setHideGraph] = React.useState(false);

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  });

  const [headerValue] = React.useState([
    { id: 0, title: '1D', complete: '1 Day' },
    { id: 1, title: '7D', complete: '7 Days' },
    { id: 2, title: '1M', complete: 'Last Month' },
    { id: 3, title: '3M', complete: '3 Months' },
    { id: 4, title: '1Y', complete: '1 Year' },
    { id: 5, title: 'All', complete: 'All' },
  ]);
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState({
    id: 0,
    title: '1D',
    complete: '1 Day',
  });
  const [filterOption1] = React.useState([
    { id: 0, title: 'All' },
    { id: 1, title: 'Doctor' },
    { id: 2, title: 'Me' },
  ]);
  const [selectedfilterOption1, setSelectedfilterOption1] = React.useState({
    id: 0,
    title: 'All',
  });
  const [filterOption2] = React.useState([
    { id: 0, title: 'kg' },
    { id: 1, title: 'lbs' },
  ]);
  const [selectedfilterOption2, setSelectedfilterOption2] = React.useState({
    id: 0,
    title: 'kg',
  });

  const weightGraphData = async () => {
    try {
      setIsLoading(true);
      const result = await healthProgressServices.getWeightMapData({
        date: selectedValue.title,
        metric: selectedfilterOption2.id == 0,
        type: selectedfilterOption1.title.toLowerCase(),
      });
      setChartState(result.data.chart);
      setIsLoading(false);
      setHideGraph(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    weightGraphData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedValue,
    selectedfilterOption1,
    selectedfilterOption2,
    weightLogs,
    isFocused,
  ]);

  React.useEffect(() => {
    dispatch(
      getReduxWeightLogs({
        metric: selectedfilterOption2.id == 0,
        type: selectedfilterOption1.title.toLowerCase(),
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedfilterOption1, selectedfilterOption2]);

  React.useEffect(() => {
    if (chartState) {
      const { chartOptions } = createChart(chartState);
      setTimeout(() => {
        chartRef?.current?.setOption(chartOptions);
      }, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartState]);

  // COPIED FUNCTIONS
  const createChart = (data: any) => {
    const points =
      data.length === 0
        ? []
        : data
            .map((point) => [
              convertDate(point.date),
              point.weight !== null ? point.weight : null,
            ])
            .reverse();

    const dataset = [
      createGraphDataPoints(
        points,
        createGraphDataPointOptions(),
        selectedValue.title
      ),
    ];
    const convertedDataPoint = convertDataset(dataset);
    const graphConfig = graphXAxisConfig(
      selectedValue.title,
      points.map((p) => p[0])
    );

    return { chartOptions: getGraphOptions(convertedDataPoint, graphConfig) };
  };

  const onApplyFilters = (filter1, filter2) => {
    setSelectedfilterOption1(filter1);
    setSelectedfilterOption2(filter2);
    setIsVisible(false);
  };

  const handleBackButtonClick = () => {
    navigate(SCREENS.YOUR_HEALTH);
    // BackHandler.exitApp();
    return true;
  };

  return (
    <>
      <HealthProgressFilter
        option1={t('pages.weightTab.filters.uploadType')}
        option2={t('pages.weightTab.filters.unit')}
        visible={isVisible}
        setIsVisible={setIsVisible}
        filterOption1={filterOption1}
        filterOption2={filterOption2}
        onApplyPress={onApplyFilters}
        values={{
          selectedfilterOption1,
          selectedfilterOption2,
        }}
        filterModalClose={() => setIsVisible(false)}
      />

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <GraphHeader
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            data={headerValue}
          />
          <View style={styles.headingView}>
            <Text style={styles.heading}>
              {t('pages.healthProgress.weight')} ({selectedfilterOption2.title})
            </Text>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              <Filter fill={colors.heading} />
            </TouchableOpacity>
          </View>

          {!hideGraph && (
            <View>
              <LineGraph isLoading={isLoading} chartRef={chartRef} />
            </View>
          )}

          <Logs
            navigate={SCREENS.WEIGHT}
            logData={weightLogs?.log}
            showMore={'Show more'}
            onNavigate={() => {
              setHideGraph(true);
            }}
          />
        </ScrollView>
        <FloatingButton
          onPress={() => navigation.navigate(SCREENS.WEIGHT)}
          svg={<Person height={28} width={28} />}
        />
      </View>
    </>
  );
};

export default Index;
