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
import { BloodPressureProgressChartDataPoint } from 'types/api';
import { convertDate } from 'utils/functions/date-format';
import {
  convertDataset,
  createGraphDataPoints,
  getGraphOptions,
} from 'utils/functions/graph/graph-monocromatic';
import {
  createGraphDataPointOptions,
  graphXAxisConfig,
} from 'utils/functions/graph/graph-utils';
import { graphGreyColor } from 'utils/functions/graph/graph.types';
import { userService } from 'services/user-service/user-service';

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

  const bloodPressureGraphData = async () => {
    try {
      const result = await userService.getBloodPressureMapData({
        date: selectedValue.title,
        type: selectedfilterOption1.title.toLowerCase(),
      });
      createChart(result.data.chart);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    bloodPressureGraphData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, selectedfilterOption1]);

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

  const createChart = (data: BloodPressureProgressChartDataPoint[]) => {
    const points1 =
      data.length === 0
        ? []
        : data
            .map((point) => [
              convertDate(point.date),
              point.systolic !== null ? point.systolic : null,
            ])
            .reverse();

    const points2 =
      data.length === 0
        ? []
        : data
            .map((point) => [
              convertDate(point.date),
              point.diastolic !== null ? point.diastolic : null,
            ])
            .reverse();

    const dataset = [
      createGraphDataPoints(points1, createGraphDataPointOptions()),
      createGraphDataPoints(
        points2,
        createGraphDataPointOptions(graphGreyColor, graphGreyColor)
      ),
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
      points1.map((p) => p[0] as number)
    );

    const chartOptions = {
      ...getGraphOptions(convertedDataPoint, graphConfig),
    };

    chartRef?.current?.setOption({
      ...chartOptions,
    });
  };

  const onApplyFilters = (filter1) => {
    setSelectedfilterOption1(filter1);
    setIsVisible(false);
  };

  return (
    <>
      <HealthProgressFilter
        option1="Updated By"
        visible={isVisible}
        setIsVisible={setIsVisible}
        filterOption1={filterOption1}
        values={{ selectedfilterOption1 }}
        onApplyPress={onApplyFilters}
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
                <Text style={styles.sys}>DIA</Text>
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
