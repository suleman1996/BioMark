import { TouchableOpacity, View, ScrollView } from 'react-native';
import React from 'react';

import Styles from './styles';
import SCREENS from 'navigation/constants/index';
import { Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getReduxWeightLogs } from 'store/home/home-actions';

import GraphHeader from '../../../../../../components/graph-header/index';
import LineGraph from '../../../../../../components/line-graph/index';
import Filter from '../../..//../../../assets/svgs/filter';
import HealthProgressFilter from '../../../../../../components/health-progress-filter/index';
import Logs from '../../../../../../components/health-progress-logs/index';

import FloatingButton from '../../../../../../components/floating-button/index';
import Person from '../../../../../../assets/svgs/Bmi';
import { userService } from 'services/user-service/user-service';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  const dispatch = useDispatch();
  const weightLogs = useSelector(
    (state: IAppState) => state.home.weightLogsData
  );

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
      });
      console.log('weight api map ', result.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    weightGraphData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  React.useEffect(() => {
    dispatch(getReduxWeightLogs());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HealthProgressFilter
        option1="Updated By"
        option2="Unit"
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
            <Text style={styles.heading}>Weight (kg)</Text>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              <Filter fill={colors.heading} />
            </TouchableOpacity>
          </View>
          <LineGraph />
          <Logs navigate={SCREENS.WEIGHT} logData={weightLogs?.log} />
          <View style={{ height: 70 }} />
        </ScrollView>
        <FloatingButton svg={<Person height={28} width={28} />} />
      </View>
    </>
  );
};

export default Index;
