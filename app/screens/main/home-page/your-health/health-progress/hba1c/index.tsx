import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getReduxHba1cLogs } from 'store/home/home-actions';

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
  const dispatch = useDispatch();
  const hba1cLogsData = useSelector(
    (state: IAppState) => state.home.hba1cLogsData
  );

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
  const [logData] = React.useState([]);

  React.useEffect(() => {
    dispatch(getReduxHba1cLogs());
    // console.log('Hba1c Logs ', hba1cLogsData);
    hba1cLogsData?.log?.map((item) =>
      logData.push({
        id: item?.id,
        weight: item?.data_value,
        unit: item?.unit_name,
        date_entry: item?.record_date,
        color: item?.record_status == 'high' ? colors.dangerRed : colors.green,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

          <Logs navigate={SCREENS.HBA1C} logData={logData} />
        </ScrollView>
        <FloatingButton svg={<Hba1 height={28} width={28} />} />
      </View>
    </>
  );
};

export default Index;
