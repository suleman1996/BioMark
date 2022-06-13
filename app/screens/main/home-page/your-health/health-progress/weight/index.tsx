import { TouchableOpacity, View } from 'react-native';
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
import { userService } from 'services/user-service/user-service';

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

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const chartRef = useRef();

  const dispatch = useDispatch();
  const weightLogs = useSelector(
    (state: IAppState) => state.home.weightLogsData
  );

  const [chartState, setChartState] = React.useState(null);

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
      const result = await userService.getWeightMapData({
        date: selectedValue.title,
        metric: selectedfilterOption2.id == 0,
        type: selectedfilterOption1.title.toLowerCase(),
      });
      setChartState(result.data.chart);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    weightGraphData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, selectedfilterOption1, selectedfilterOption2]);

  React.useEffect(() => {
    dispatch(getReduxWeightLogs());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (chartState) {
      const { chartOptions } = createChart(chartState);
      setTimeout(() => {
        chartRef.current.setOption(chartOptions);
      }, 1000);
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
      createGraphDataPoints(points, createGraphDataPointOptions()),
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

  return (
    <>
      <HealthProgressFilter
        option1="Updated By"
        option2="Unit"
        visible={isVisible}
        setIsVisible={setIsVisible}
        filterOption1={filterOption1}
        filterOption2={filterOption2}
        onApplyPress={onApplyFilters}
        values={{
          selectedfilterOption1,
          selectedfilterOption2,
        }}
      />

      <View style={styles.container}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <GraphHeader
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          data={headerValue}
        />
        <View style={styles.headingView}>
          <Text style={styles.heading}>
            Weight ({selectedfilterOption2.title})
          </Text>
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <Filter fill={colors.heading} />
          </TouchableOpacity>
        </View>
        <LineGraph chartRef={chartRef} />
        <Logs
          navigate={SCREENS.WEIGHT}
          logData={weightLogs?.log}
          showMore={'Show more'}
        />
        <View style={{ height: 70 }} />
        {/* </ScrollView> */}
        <FloatingButton svg={<Person height={28} width={28} />} />
      </View>
    </>
  );
};

export default Index;
