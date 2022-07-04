import fonts from 'assets/fonts';
import BioBookings from 'components/svg/bio-bookings';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { navigate } from 'services/nav-ref';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import SCREENS from '../../navigation/constants/index';
import { IAppState } from './../../store/IAppState';

export default function TestBookinButton() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const booking_count = useSelector(
    (state: IAppState) => state.notifications.allAppointmentCounts
  );

  const hasNoti =
    booking_count.covid_booking_count > 0
      ? { borderColor: colors.darkPrimary, borderWidth: 1 }
      : {};

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      {booking_count.booking_result_count > 0 ||
      booking_count.covid_booking_count > 0 ? (
        <View style={styles.redDot} />
      ) : null}
      <View style={[styles.circleBtn, hasNoti]}>
        <TouchableRipple
          style={styles.btn}
          rippleColor={'rgba(0,128,128,0.05)'}
          onPress={() =>
            navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
              screen: SCREENS.COVID19BOOKINGS,
            })
          }
        >
          <BioBookings width={7} height={7} />
        </TouchableRipple>
      </View>
      <View>
        <Text style={styles.healthText}>{t('pages.covid.home.bookings')}</Text>
      </View>
    </View>
  );
}

const makeStyles = (colors: any) =>
  StyleSheet.create({
    circleBtn: {
      backgroundColor: 'white',
      borderRadius: 300,
      width: widthToDp(14),
      height: widthToDp(14),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 3,
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    healthText: {
      fontFamily: fonts.bold,
      fontSize: RFValue(15),
      color: colors.heading,
    },
    redDot: {
      width: widthToDp(2.4),
      height: widthToDp(2.4),
      backgroundColor: colors.red,
      borderRadius: widthToDp(1.2),
      position: 'absolute',
      right: 3,
      top: 3,
      zIndex: 1000,
      elevation: 13,
    },
    btn: {
      width: widthToDp(14),
      height: widthToDp(14),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
