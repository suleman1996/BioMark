import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import React, { useRef } from 'react';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getReduxBloodPressureLogs } from 'store/home/home-actions';

import GraphHeader from '../../../../../../components/graph-header/index';
import Filter from '../../..//../../../assets/svgs/filter';
import HealthProgressFilter from '../../../../../../components/health-progress-filter/index';
import Logs from '../../../../../../components/health-progress-logs/index';
import FloatingButton from '../../../../../../components/floating-button/index';
import LineGraph from '../../../../../../components/line-graph/index';
import SCREENS from 'navigation/constants/index';

import Info from 'react-native-vector-icons/AntDesign';
import BloodPressure from '../../../../../../assets/svgs/bP';

import Styles from './styles';
import {
  convertDataset,
  createGraphDataPoints,
  getGraphOptions,
} from 'utils/functions/graph/graph-monocromatic';
import { userService } from 'services/user-service/user-service';
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

  const bPLogsData = useSelector((state: IAppState) => state.home.bPLogsData);

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
    { id: 0, title: 'All' },
    { id: 1, title: 'Doctor' },
    { id: 2, title: 'Me' },
  ]);
  const [selectedfilterOption1, setSelectedfilterOption1] = React.useState({
    id: 0,
    title: 'All',
  });

  const [logData, setLogData] = React.useState([]);

  const fetchData = async () => {
    try {
      const result = await userService.getBloodPressureChart({
        date: selectedValue.title,
        type: selectedfilterOption1.title.toLowerCase(),
      });
      createChart(result.data.chart);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    dispatch(getReduxBloodPressureLogs());
    //
    setLogData(
      bPLogsData?.log?.map((item) => ({
        id: item?.id,
        weight: item?.bp_diastolic + '/' + item?.bp_systolic,
        unit: 'mmHg',
        date_entry: item?.date_entry,
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, selectedfilterOption1]);

  // COPIED FUNCTIONS
  const createChart = (data: any) => {
    const points =
      data.length === 0
        ? []
        : data
            .map((point) => [
              convertDate(point.date),
              point.systolic,
              point.diastolic,
            ])
            .reverse();

    const dataset = [
      createGraphDataPoints(points, createGraphDataPointOptions()),
    ];
    const convertedDataPoint = convertDataset(dataset);
    const graphConfig = graphXAxisConfig(
      selectedValue.title == '1D'
        ? 0
        : selectedValue.title == '7D'
        ? 1
        : selectedValue.title == '1M'
        ? 2
        : selectedValue.title == '3M'
        ? 3
        : selectedValue.title == '1Y'
        ? 4
        : 5,
      points.map((p) => p[0])
    );

    chartRef.current.setOption({
      ...getGraphOptions(convertedDataPoint, graphConfig),
    });
  };

  return (
    <>
      <HealthProgressFilter
        option1="Updated By"
        visible={isVisible}
        setIsVisible={setIsVisible}
        filterOption1={filterOption1}
        selectedfilterOption1={selectedfilterOption1}
        setSelectedfilterOption1={setSelectedfilterOption1}
      />
      <View style={styles.container}>
        <ScrollView>
          <GraphHeader
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            data={headerValue}
          />
          <View style={styles.headingView}>
            <View style={{ width: '40%' }}>
              <Text style={styles.heading}>Blood Pressure (mmmHg)</Text>
            </View>

            <View style={styles.rowCenter}>
              <TouchableOpacity>
                <Info
                  color={colors.heading}
                  style={{ marginRight: 10 }}
                  name="infocirlceo"
                />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.dash} />
                <Text style={styles.sys}>SYS</Text>
                <Text style={styles.sys}> / </Text>
                <View
                  style={[styles.dash, { borderColor: colors.lightGrey }]}
                />
                <Text style={styles.sys}>SYS</Text>
              </View>
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => setIsVisible(!isVisible)}
              >
                <Filter fill={colors.heading} />
              </TouchableOpacity>
            </View>
          </View>
          <LineGraph chartRef={chartRef} />
          <Logs navigate={SCREENS.BLOOD_PRESSURE} logData={logData} />
          <View style={{ height: 70 }} />
        </ScrollView>
        <FloatingButton svg={<BloodPressure height={28} width={28} />} />
      </View>
    </>
  );
};

export default Index;
