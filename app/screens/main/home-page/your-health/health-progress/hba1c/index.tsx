import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Styles from './styles';
import SCREENS from 'navigation/constants/index';

import GraphHeader from '../../../../../../components/graph-header/index';
import Logs from '../../../../../../components/health-progress-logs/index';
import FloatingButton from '../../../../../../components/floating-button/index';

import Target from 'react-native-vector-icons/MaterialCommunityIcons';
import Info from 'react-native-vector-icons/AntDesign';
import Hba1 from '../../../../../../assets/svgs/diabtes';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const navigation = useNavigation();
  const { TARGETS } = SCREENS;

  const [headerValue] = React.useState([
    { id: 0, title: '1M', complete: '1 Month' },
    { id: 1, title: '3M', complete: '3 Months' },
    { id: 2, title: '1Y', complete: '1 Year' },
    { id: 3, title: 'All', complete: 'All' },
  ]);
  const [selectedValue, setSelectedValue] = React.useState({
    id: 0,
    title: '1M',
    complete: '1 Month',
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
      <View style={styles.container}>
        <ScrollView>
          <GraphHeader
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            data={headerValue}
          />
          <View style={styles.headingView}>
            <View style={styles.rowCenter}>
              <Text style={styles.heading}>hbA1c (%)</Text>
              <TouchableOpacity>
                <Info
                  color={colors.heading}
                  style={{ marginLeft: 10 }}
                  name="infocirlceo"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate(TARGETS, { key: 1 })}
            >
              <Target size={24} name="target" color={colors.blue} />
            </TouchableOpacity>
          </View>

          <Logs logData={logData} />
        </ScrollView>
        <FloatingButton svg={<Hba1 height={28} width={28} />} />
      </View>
    </>
  );
};

export default Index;
