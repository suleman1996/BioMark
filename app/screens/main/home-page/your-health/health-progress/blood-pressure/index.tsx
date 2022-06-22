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
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Tip } from 'react-native-tip';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = Styles(colors);
  const chartRef = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const focused = useIsFocused();

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
  const [isLoading, setIsLoading] = React.useState(false);

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
  const [chartState, setChartState] = React.useState(null);
  const [hideGraph, setHideGraph] = React.useState(false);

  const bloodPressureGraphData = async () => {
    try {
      setIsLoading(true);
      const result = await userService.getBloodPressureMapData({
        date: selectedValue.title,
        type: selectedfilterOption1.title.toLowerCase(),
      });
      setChartState(result.data.chart);
      setIsLoading(false);
      setHideGraph(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    dispatch(
      getReduxBloodPressureLogs({
        type: selectedfilterOption1.title.toLowerCase(),
      })
    );
  }, [dispatch, selectedfilterOption1]);

  React.useEffect(() => {
    bloodPressureGraphData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, selectedfilterOption1, bPLogsData, focused]);

  React.useEffect(() => {
    setLogData(
      bPLogsData?.log?.map((item) => ({
        id: item?.id,
        weight: item?.bp_systolic + '/' + item?.bp_diastolic,
        unit: 'mmHg',
        date_entry: item?.date_entry,
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bPLogsData, selectedfilterOption1, selectedValue]);

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
      selectedValue.title,
      points1.map((p) => p[0] as number)
    );

    const chartOptions = {
      ...getGraphOptions(convertedDataPoint, graphConfig),
    };

    return { chartOptions };
  };
  React.useEffect(() => {
    if (chartState && chartRef.current) {
      const { chartOptions } = createChart(chartState);
      setTimeout(() => {
        chartRef?.current?.setOption(chartOptions);
      }, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartState]);

  const onApplyFilters = (filter1) => {
    setSelectedfilterOption1(filter1);
    setIsVisible(false);
  };

  return (
    <>
      <HealthProgressFilter
        option1={t('pages.bloodPressureTab.filters.uploadType')}
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
              <Text style={styles.heading}>
                {t('pages.bloodPressureInput.title')} (mmHg)
              </Text>
            </View>

            <View style={styles.rowCenter}>
              <View style={{ marginRight: 10 }}>
                <Tip
                  body={t('pages.bloodPressureInput.definition')}
                  bodyStyle={{ color: '#fff' }}
                  tipContainerStyle={{
                    backgroundColor: colors.shineBlue,
                    width: '60%',
                  }}
                  overlayOpacity={0.001}
                >
                  <Info color={colors.heading} name="infocirlceo" />
                </Tip>
              </View>
              <View style={styles.rowCenter}>
                <View style={styles.dash} />
                <Text style={styles.sys}>
                  {t('pages.bloodPressureTab.sys')}
                </Text>
                <Text style={styles.sys}> / </Text>
                <View
                  style={[
                    styles.dash,
                    {
                      borderColor: colors.lightDark,
                    },
                  ]}
                />
                <Text style={styles.sys}>
                  {t('pages.bloodPressureTab.dia')}
                </Text>
              </View>
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => setIsVisible(!isVisible)}
              >
                <Filter fill={colors.heading} />
              </TouchableOpacity>
            </View>
          </View>
          {!hideGraph && (
            <LineGraph isLoading={isLoading} chartRef={chartRef} />
          )}
          <Logs
            navigate={SCREENS.BLOOD_PRESSURE}
            logData={logData}
            onNavigate={() => setHideGraph(true)}
          />
          <View style={{ height: 70 }} />
        </ScrollView>
        <FloatingButton
          onPress={() => navigation.navigate(SCREENS.BLOOD_PRESSURE)}
          svg={<BloodPressure height={28} width={28} />}
        />
      </View>
    </>
  );
};

export default Index;
