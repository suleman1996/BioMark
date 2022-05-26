import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import GraphHeader from '../../../../../../components/graph-header/index';
import Filter from '../../..//../../../assets/svgs/filter';
import HealthProgressFilter from '../../../../../../components/health-progress-filter/index';
import Logs from '../../../../../../components/health-progress-logs/index';
import FloatingButton from '../../../../../../components/floating-button/index';
import LineGraph from '../../../../../../components/line-graph/index';

import Info from 'react-native-vector-icons/AntDesign';
import BloodPressure from '../../../../../../assets/svgs/bP';

import Styles from './styles';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);

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

  const [logData] = React.useState([
    {
      id: 0,
      value: '66.0 mg/dL',
      date: '09:14 pm May 12, 2022',
    },
    {
      id: 1,
      value: '66.0 mg/dL',
      date: '09:14 pm May 12, 2022',
    },
    {
      id: 2,
      value: '66.0 mg/dL',
      date: '09:14 pm May 12, 2022',
    },
    {
      id: 3,
      value: '66.0 mg/dL',
      date: '09:14 pm May 12, 2022',
    },
  ]);

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
          <LineGraph />
          <Logs logData={logData} />
        </ScrollView>
        <FloatingButton svg={<BloodPressure height={28} width={28} />} />
      </View>
    </>
  );
};

export default Index;
