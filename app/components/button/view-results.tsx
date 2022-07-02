import React from 'react';

import { useTheme } from 'react-native-paper';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import BioResultsIcon from 'components/svg/bio-results-icon';

import { navigate } from './../../services/nav-ref';
import SCREENS from '../../navigation/constants/index';
import fonts from 'assets/fonts';
import { t } from 'i18next';
import { IAppState } from 'store/IAppState';
import { useSelector } from 'react-redux';
import { widthToDp } from 'utils/functions/responsive-dimensions';

export default function ViewResultsButton() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const booking_count = useSelector(
    (state: IAppState) => state.notifications.allAppointmentCounts
  );
  const hasNoti =
    booking_count.booking_result_count > 0
      ? { borderColor: colors.darkPrimary, borderWidth: 1 }
      : {};

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity activeOpacity={0.6}>
        {booking_count.booking_result_count > 0 ? (
          <View style={styles.redDot} />
        ) : null}
        <TouchableOpacity
          onPress={() =>
            navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
              screen: SCREENS.VIEWCOVIDRESULTS,
            })
          }
          activeOpacity={0.6}
          style={[styles.circleBtn, hasNoti]}
        >
          <BioResultsIcon width={7} height={7} />
        </TouchableOpacity>
      </TouchableOpacity>
      <View>
        <Text style={styles.healthText}>
          {t('pages.covid.home.viewResults')}
        </Text>
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
