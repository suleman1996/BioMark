import ButtonComponent from 'components/base/button';
import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { navigate } from 'services/nav-ref';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import SuggestionsText from '../suggestions-text';
import { makeStyles } from './styles';
import SCREENS from 'navigation/constants';
import BioBookings from 'components/svg/bio-bookings';
import EmptyResultComponent from 'components/higher-order/empty-result';
import { useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { BookingListDataUpcoming } from 'types/api';
import { dateFormat1, getTime, getDayName } from 'utils/functions/date-format';
type Props = {};

const UpcommingBookings = (props: Props) => {
  const {} = props;
  const { colors }: any = useTheme();
  const allUpcommingBookings = useSelector(
    (state: IAppState) => state.covid.allBookingsData.upcoming
  );
  const styles = makeStyles(colors);
  const _renderItem = ({ item }: { item: BookingListDataUpcoming }) => {
    const {
      patient_name = '',
      booking_id = '',
      booking_test_type = '',
      test_centre_name = '',
      booking_schedule_date = '',
      booking_slot_time = '',
      test_country_name = '',
      test_city_name = '',
      declaration_enabled = false,
      // declaration_complete = false,
      is_cancellable = false,
    } = {
      patient_name: item.patient_name,
      booking_id: item.reference_code,
      booking_test_type: item.booking_test_type,
      test_centre_name: item.test_centre_name,
      booking_schedule_date: item.booking_schedule.toString(),
      booking_slot_time: item.booking_slot_time,
      test_country_name: item.test_country_name,
      test_city_name: item.test_city_name,
      declaration_enabled: item.declaration_enabled,
      // declaration_complete: item.declaration_complete,
      is_cancellable: item.is_cancellable,
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
        <Text
          style={styles.locationText}
        >{`${booking_test_type} ${test_centre_name}`}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.dateandtimeText}>{`${getDayName(
            booking_schedule_date
          )}, ${dateFormat1(booking_schedule_date)} ${getTime(
            booking_slot_time
          )}`}</Text>
          <MaterialCommunityIcons
            name="barcode-scan"
            color={colors.darkPrimary}
            size={responsiveFontSize(20)}
          />
        </View>
        <Text
          style={styles.cityNameText}
        >{`${test_country_name}, ${test_city_name}`}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: heightToDp(1),
          }}
        >
          <Pressable
            disabled={declaration_enabled}
            style={[
              styles.button,
              declaration_enabled ? {} : { backgroundColor: colors.fieldGrey },
            ]}
          >
            <Text style={styles.dateandtimeText}>Health Declaration</Text>
          </Pressable>
          <Pressable
            disabled={!is_cancellable}
            style={[
              styles.button,
              !is_cancellable ? {} : { backgroundColor: colors.fieldGrey },
            ]}
          >
            <Text style={[styles.dateandtimeText, { color: colors.darkGray }]}>
              Cancel Test
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={() => <SuggestionsText />}
        renderItem={_renderItem}
        data={allUpcommingBookings}
        ListEmptyComponent={() => {
          return (
            <>
              <View style={{ paddingTop: heightToDp(5) }} />
              <EmptyResultComponent
                title="No Upcomming Bookings"
                subTitle="You have no COVID bookings scheduled yet."
                icon={<BioBookings width={14} height={14} />}
              />
            </>
          );
        }}
        ListFooterComponent={() => (
          <View style={{ paddingTop: heightToDp(20) }} />
        )}
      />
      <View style={styles.buttonContainer}>
        <ButtonComponent onPress={undefined} title={'Book New COVID-19 Test'} />
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

export default UpcommingBookings;
