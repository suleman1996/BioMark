/* eslint-disable @typescript-eslint/no-unused-vars */
import EmptyResultComponent from 'components/higher-order/empty-result';
import BioBookings from 'components/svg/bio-bookings';
import CovidHealthDeclarationModal from 'components/ui/covid-health-declaration/index';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  // TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { covidService } from 'services/covid-service';
import { IAppState } from 'store/IAppState';
import { BookingListDataUpcoming } from 'types/api';
import { dateFormat1, getDayName, getTime } from 'utils/functions/date-format';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import BarCodeModal from 'components/ui/bar-code-modal';
import SuggestionsText from 'components/ui/suggestions-text';
import { makeStyles } from './styles';
import { useTranslation } from 'react-i18next';
import DeleteModalComponent from 'components/higher-order/delete-modal';
import { userService } from 'services/user-service/user-service';
import { ActivityIndicator } from 'components';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { getAllBookingsDataR } from 'store/covid/covid-actions';

type Props = {};

const UpcommingBookings = (props: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {} = props;
  const { colors }: any = useTheme();
  const allUpcommingBookings = useSelector(
    (state: IAppState) => state.covid.allBookingsData.upcoming
  );

  const [isHealthDeclaration, setIsHealthDeclaration] = useState(false);
  const [barCodeText, setBarCodeText] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const [modalData, setModalData] = useState({});
  const [isCancelModal, setCancelModal] = useState(false);
  const [isVisiable, setIsVisible] = React.useState(false);
  const [isBarModal, setIsBarModal] = useState(false);

  const styles = makeStyles(colors);

  useEffect(() => {
    if (allUpcommingBookings) {
      upDateBatch(allUpcommingBookings);
    }
  }, [allUpcommingBookings]);

  const upDateBatch = async (item: BookingListDataUpcoming) => {
    try {
      await covidService.batchReadForUpcomming({ data: item });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBooking = async () => {
    try {
      setIsVisible(true);
      const response = await userService.deleteBooking({
        id: appointmentId,
      });
      await dispatch(getAllBookingsDataR());
      setIsVisible(false);
    } catch (err) {
      showMessage({
        message: err.errMsg.data.message,
        type: 'danger',
      });
      setIsVisible(false);
    }
  };

  const _renderItem = ({ item }: { item: BookingListDataUpcoming }) => {
    setAppointmentId(item.id);
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
      declaration_complete = true,
      is_cancellable = false,
      is_dependent = false,
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
      declaration_complete: item.declaration_complete,
      is_cancellable: item.is_cancellable,
      is_dependent: item.is_dependent,
    };

    return (
      <View style={styles.singleItemContainer}>
        <BarCodeModal
          setIsVisible={setIsBarModal}
          isVisible={isBarModal}
          text={barCodeText}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.whoIsText}>
            {is_dependent ? patient_name : 'You'}
          </Text>
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
          <Pressable
            onPress={() => {
              setIsBarModal(true);
              setBarCodeText(booking_id);
            }}
          >
            <MaterialCommunityIcons
              name="barcode-scan"
              color={colors.darkPrimary}
              size={responsiveFontSize(30)}
            />
          </Pressable>
        </View>
        <Text
          style={styles.cityNameText}
        >{`${test_country_name}, ${test_city_name}`}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            // marginTop: heightToDp(1),
          }}
        >
          {declaration_complete ? (
            <View style={styles.completeDecContainer}>
              <AntDesign name="checkcircle" color={colors.primary} />
              <Text style={styles.completeDecText}>
                Health Declaration Completed
              </Text>
            </View>
          ) : null}

          <Pressable
            disabled={!moment(booking_schedule_date).isAfter(new Date())}
            onPress={() => {
              setCancelModal(true);
            }}
            style={[
              styles.button,
              moment(booking_schedule_date).isAfter(new Date())
                ? {}
                : { backgroundColor: colors.fieldGrey },
            ]}
          >
            <Text
              style={[
                styles.dateandtimeText,
                moment(booking_schedule_date).isAfter(new Date())
                  ? { color: colors.danger }
                  : { color: colors.darkGrey },
              ]}
            >
              Cancel Test
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator visible={isVisiable} />
      <DeleteModalComponent
        isVisible={isCancelModal}
        setIsVisible={setCancelModal}
        heading={'cancel COVID Test Booking'}
        subHeading={
          'Are you sure you want ti cancel? All refunds are subjected to payment processing fees.'
        }
        callMe={deleteBooking}
      />
      <CovidHealthDeclarationModal
        setIsVisible={setIsHealthDeclaration}
        isVisible={isHealthDeclaration}
        data={modalData}
        decalrations={[modalData]}
      />
      <SuggestionsText icon={true} />

      <FlatList
        renderItem={_renderItem}
        data={allUpcommingBookings}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                alignSelf: 'center',
                width: '100%',
                height: heightToDp(55),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <EmptyResultComponent
                title={t('pages.covid-booking.emptyMessage.upcomingTitle')}
                subTitle={t(
                  'pages.covid-booking.emptyMessage.upcomingSubTitle'
                )}
                icon={<BioBookings width={14} height={14} />}
              />
            </View>
          );
        }}
        ListFooterComponent={() => (
          <View style={{ paddingTop: heightToDp(20) }} />
        )}
      />
    </View>
  );
};

export default UpcommingBookings;
// function useDispatch() {
//   throw new Error('Function not implemented.');
// }
