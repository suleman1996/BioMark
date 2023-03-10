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
import { useSelector } from 'react-redux';
import { covidService } from 'services/covid-service';
import { IAppState } from 'store/IAppState';
import { BookingListDataUpcoming } from 'types/api';
import { dateFormat1, getDayName, getTime } from 'utils/functions/date-format';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import BarCodeModal from '../bar-code-modal';
import CovidHealthDeclarationForAllUpCommingModal from '../covid-health-declaration-for-all-upcomming/index';
import SuggestionsText from '../suggestions-text';
import { makeStyles } from './styles';
import { useRoute } from '@react-navigation/native';
import { t } from 'i18next';
import ButtonComponent from 'components/base/button';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';
import DeleteModalComponent from 'components/higher-order/delete-modal';

type Props = {};

const UpcommingBookings = (props: Props) => {
  const {} = props;
  const { colors }: any = useTheme();
  const route = useRoute();
  const allUpcommingBookings = useSelector(
    (state: IAppState) => state.covid.allBookingsData.upcoming
  );

  const [isHealthDeclaration, setIsHealthDeclaration] = useState(false);
  const [barCodeText, setBarCodeText] = useState('');

  const [isHealthDeclarationAll, setIsHealthDeclarationAll] = useState(false);
  const [isCancelModal, setCancelModal] = useState(false);

  const [modalData, setModalData] = useState({});
  const [isBarModal, setIsBarModal] = useState(false);

  const styles = makeStyles(colors);

  useEffect(() => {
    if (allUpcommingBookings) {
      upDateBatch(allUpcommingBookings);
    }
  }, [allUpcommingBookings]);
  useEffect(() => {
    if (route?.params?.has_pending_declaration) {
      setIsHealthDeclarationAll(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const upDateBatch = async (item: BookingListDataUpcoming) => {
    try {
      await covidService.batchReadForUpcomming({ data: item });
    } catch (err) {
      console.error(err);
    }
  };

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
            <Text style={styles.bookingId}>
              {t('pages.covid-booking.bookingId')}
              {' -'}
            </Text>
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
            justifyContent: 'space-between',
            marginTop: heightToDp(1),
          }}
        >
          {declaration_complete ? (
            <View style={styles.completeDecContainer}>
              <AntDesign name="checkcircle" color={colors.primary} />
              <Text style={styles.completeDecText}>
                {t('pages.appointment.healthDeclarationComplete')}
              </Text>
            </View>
          ) : (
            <Pressable
              disabled={!declaration_enabled}
              onPress={() => {
                setIsHealthDeclaration(true);
                setModalData(item);
              }}
              style={[
                styles.button,
                declaration_enabled
                  ? {}
                  : { backgroundColor: colors.fieldGrey },
              ]}
            >
              <Text style={styles.dateandtimeText}>
                {t('pages.search.covidBooking.suggestions.healthDeclaration')}
              </Text>
            </Pressable>
          )}

          <Pressable
            disabled={!is_cancellable}
            onPress={() => {
              setCancelModal(true);
            }}
            style={[
              styles.button,
              !is_cancellable
                ? { backgroundColor: colors.fieldGrey }
                : { backgroundColor: colors.white },
            ]}
          >
            <Text
              style={[
                styles.dateandtimeText,
                !is_cancellable
                  ? { color: colors.darkGrey }
                  : { color: colors.danger },
              ]}
            >
              {t('pages.covid.covid-booking-button.cancelButton')}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <DeleteModalComponent
        isVisible={isCancelModal}
        setIsVisible={setCancelModal}
        heading={'cancel COVID Test Booking'}
        subHeading={
          'Are you sure you want ti cancel? All refunds are subjected to payment processing fees.'
        }
        callMe={undefined}
      />
      <CovidHealthDeclarationModal
        setIsVisible={setIsHealthDeclaration}
        isVisible={isHealthDeclaration}
        data={modalData}
        decalrations={[modalData]}
      />
      <CovidHealthDeclarationForAllUpCommingModal
        setIsVisible={setIsHealthDeclarationAll}
        isVisible={isHealthDeclarationAll}
        data={modalData}
        decalrations={[modalData]}
        //  allUpcommingBookings={allUpcommingBookings}
      />

      <SuggestionsText icon={true} />

      <FlatList
        renderItem={_renderItem}
        data={allUpcommingBookings}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                alignSelf: 'center',
                width: '100%',
                height: heightToDp(50),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <EmptyResultComponent
                title="No Upcoming Appointments"
                subTitle="You have no COVID bookings scheduled yet."
                icon={<BioBookings width={14} height={14} />}
              />
            </View>
          );
        }}
        ListFooterComponent={() => (
          <View style={{ paddingTop: heightToDp(20) }} />
        )}
      />
      <View style={styles.buttonContainer}>
        <ButtonComponent
          onPress={() => {
            navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
              screen: SCREENS.BOOKCOVIDTEST,
            });
          }}
          title={'Book New COVID-19 Test'}
        />
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
