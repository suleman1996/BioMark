import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';

import { BookingIcon } from 'assets/svgs/index';
import fonts from 'assets/fonts';
// import SCREENS from '../../navigation/constants';
// import { navigate } from '../../services/nav-ref';
import { useTranslation } from 'react-i18next';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { useSelector } from 'react-redux';
import { IAppState } from './../../store/IAppState';

export default function BookingBtn() {
  const { t } = useTranslation();
  const { colors }: any = useTheme();
  const styles = makeStyles(colors);
  const booking_count = useSelector(
    (state: IAppState) => state.notifications.allAppointmentCounts
  );
  const hasNoti =
    booking_count.booking_result_count > 0 ||
    booking_count.covid_booking_count > 0
      ? { borderColor: colors.darkPrimary, borderWidth: 0.7 }
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
            // onPress
            //   ? onPress()
            //   : navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
            //       screen: SCREENS.COVID19HOME,
            //     })
            {}
          }
        >
          <BookingIcon />
        </TouchableRipple>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.covidText}>{t('pages.booking.header')}</Text>
        <Text style={styles.covidTextnotification}>Coming Soon</Text>
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
      overflow: Platform.OS == 'ios' ? 'visible' : 'hidden',
    },
    covidText: {
      fontFamily: fonts.bold,
      fontSize: RFValue(15),
      color: colors.heading,
    },
    covidTextnotification: {
      fontSize: RFValue(8),
      color: colors.grey,
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
