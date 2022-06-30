import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logNow } from 'utils/functions/log-binder';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import HistoryBookings from './../../../components/ui/history-bookings/index';
import UpcommingBookings from './../../../components/ui/upcomming-bookings/index';
import makeStyles from './styles';
import { getAllBookingsDataR } from 'store/covid/covid-actions';
import { t } from 'i18next';

type Props = {};

const Covid19Bookings = (props: Props) => {
  const {} = props;
  const { colors }: any = useTheme();
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const styles = makeStyles(colors);
  const [selectedHorizontal, setSelectedHorizontal] = useState(0);

  /*eslint-disable */
  const getAllBookingsData = async () => {
    await dispatch(getAllBookingsDataR());
  };

  useEffect(() => {
    getAllBookingsData();
  }, [focused]);
  /*eslint-enable */

  const horizontalListItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    const ifST =
      selectedHorizontal === index
        ? { color: colors.darkPrimary }
        : { color: colors.inactive };
    const ifSBLine =
      selectedHorizontal === index
        ? { borderBottomWidth: 2 }
        : { borderBottomWidth: 0 };
    return (
      <TouchableRipple
        onPress={() => {
          logNow('hello', index);
          setSelectedHorizontal(index);
        }}
        style={[styles.horizontalListItem, ifSBLine]}
      >
        <Text style={[styles.horizontalListItemText, ifST]}>{item}</Text>
      </TouchableRipple>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={{ flexGrow: 0 }}
          horizontal
          keyExtractor={(index) => index.toString()}
          ListHeaderComponent={<View style={{ width: widthToDp(6) }} />}
          ListFooterComponent={<View style={{ width: widthToDp(10) }} />}
          data={[
            t('pages.appointment.tabs.upcoming'),
            t('pages.appointment.tabs.history'),
          ]}
          renderItem={horizontalListItem}
        />

        {selectedHorizontal === 0 ? (
          <View style={{ flex: 1, backgroundColor: colors.primaryGray }}>
            <UpcommingBookings />
          </View>
        ) : (
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HistoryBookings />
          </View>
        )}
      </View>
    </>
  );
};

export default Covid19Bookings;
