import fonts from 'assets/fonts';
import BioBookings from 'components/svg/bio-bookings';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
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
      <TouchableOpacity activeOpacity={0.6}>
        {booking_count.covid_booking_count > 0 ? (
          <View style={styles.redDot} />
        ) : null}
        <TouchableOpacity
          onPress={() =>
            navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
              screen: SCREENS.COVID19BOOKINGS,
            })
          }
          activeOpacity={0.6}
          style={[styles.circleBtn, hasNoti]}
        >
          <BioBookings width={7} height={7} />
        </TouchableOpacity>
      </TouchableOpacity>
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
      paddingHorizontal: 15,
      paddingVertical: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 10,
      marginBottom: 5,
    },
    healthText: {
      fontFamily: fonts.bold,
      fontSize: 15,
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
    },
  });
