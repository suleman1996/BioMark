import ButtonComponent from 'components/base/button';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { makeStyles } from './styles';
import { navigate } from './../../../services/nav-ref';
import SCREENS from 'navigation/constants';
import EmptyResultComponent from 'components/higher-order/empty-result';
import BioBookings from 'components/svg/bio-bookings';
import { IAppState } from 'store/IAppState';
import { useSelector } from 'react-redux';
import { BookingListData } from 'types/api';
import { dateFormat1, getTime } from 'utils/functions/date-format';
type Props = {};

const HistoryBookings = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const allHistoryBookings = useSelector(
    (state: IAppState) => state.covid.allBookingsData.history
  );

  const RenderStatus = (status: string) => {
    if (status == 'Cancelled') {
      return <Text style={styles.cancelledText}>Cancelled</Text>;
    } else if (status == 'Confirmed') {
      return (
        <View style={styles.confirmedContainer}>
          <View style={styles.confirmedDot} />
          <Text style={styles.confirmedText}>Confirmed</Text>
        </View>
      );
    } else if (status == 'Results Ready') {
      return (
        <View style={styles.readyContainer}>
          <View style={styles.readyDot} />
          <Text style={styles.confirmedText}>Results Ready</Text>
        </View>
      );
    }
  };

  const _renderItem = ({ item }: { item: BookingListData }) => {
    const {
      patient_name = '',
      booking_id = '',
      booking_test_type = '',
      test_centre_name = '',
      booking_schedule_date = '',
      booking_slot_time = '',
      test_country_name = '',
      test_city_name = '',
      // declaration_enabled = false,
      // declaration_complete = false,
      // is_cancellable = false,
      booking_status = '',
    } = {
      patient_name: item.patient_name,
      booking_id: item.reference_code,
      booking_test_type: item.booking_test_type,
      test_centre_name: item.test_centre_name,
      booking_schedule_date: item.booking_schedule.toString(),
      booking_slot_time: item.booking_slot_time,
      test_country_name: item.test_country_name,
      test_city_name: item.test_city_name,
      // declaration_enabled: item.declaration_enabled,
      // declaration_complete: item.declaration_complete,
      // is_cancellable: item.is_cancellable,
      booking_status: item.booking_status,
    };
    return (
      <View style={styles.singleItemContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.whoIsText}>{patient_name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.bookingId}>Booking ID -</Text>
            <Text style={styles.idText}>{booking_id}</Text>
          </View>
        </View>
        <Text style={styles.locationText}>
          {`${booking_test_type} ${test_centre_name}`}
        </Text>
        <Text
          style={styles.cityNameText}
        >{`${test_country_name}, ${test_city_name}`}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.dateandtimeText}>{`${dateFormat1(
            booking_schedule_date
          )} ${getTime(booking_slot_time)}`}</Text>
          {RenderStatus(booking_status)}
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        renderItem={_renderItem}
        data={allHistoryBookings}
        ListFooterComponent={() => (
          <View style={{ paddingTop: heightToDp(20) }} />
        )}
        ListEmptyComponent={() => {
          return (
            <>
              <View style={{ paddingTop: heightToDp(5) }} />
              <EmptyResultComponent
                title="No Recent Bookings"
                subTitle={`This is where you can see your\npast COVID bookings.`}
                icon={<BioBookings width={14} height={14} />}
              />
            </>
          );
        }}
      />
      <View style={styles.buttonContainer}>
        <ButtonComponent
          bg={colors.lightBlue}
          color={colors.black}
          marginTop={1.2}
          onPress={() =>
            navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
              screen: SCREENS.FAQSCREEN,
            })
          }
          title={'FAQ'}
        />
      </View>
    </View>
  );
};

export default HistoryBookings;
