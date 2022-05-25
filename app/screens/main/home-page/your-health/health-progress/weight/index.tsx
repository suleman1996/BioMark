import { TouchableOpacity, View } from 'react-native';
import React from 'react';

import Styles from './styles';
import { Text, useTheme } from 'react-native-paper';

import GraphHeader from '../../../../../../components/graph-header/index';
import LineGraph from '../../../../../../components/line-graph/index';
import Filter from '../../..//../../../assets/svgs/filter';
import HealthProgressFilter from '../../../../../../components/health-progress-filter/index';
import Logs from '../../../../../../components/health-progress-logs/index';
import FloatingButton from '../../../../../../components/floating-button/index';
import Person from '../../../../../../assets/svgs/Bmi';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);

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
  const [logData] = React.useState([
    {
      id: 0,
      value: '30.00kg',
      date: '09:14 pm May 12, 2022',
    },
    {
      id: 1,
      value: '30.00kg',
      date: '09:14 pm May 12, 2022',
    },
    {
      id: 2,
      value: '30.00kg',
      date: '09:14 pm May 12, 2022',
    },
    {
      id: 3,
      value: '30.00kg',
      date: '09:14 pm May 12, 2022',
    },
  ]);

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
        <Logs logData={logData} />
        <FloatingButton svg={<Person />} />
      </View>
    </>
  );
};

export default Index;
