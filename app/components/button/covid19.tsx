import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Covid19 } from 'assets/svgs/index';
import fonts from 'assets/fonts';
import SCREENS from '../../navigation/constants';
import { navigate } from '../../services/nav-ref';
import { useTranslation } from 'react-i18next';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { useSelector } from 'react-redux';
import { IAppState } from './../../store/IAppState';

export default function Covid19Btn({ onPress }) {
  const { t } = useTranslation();
  const { colors }: any = useTheme();
  const styles = makeStyles(colors);
  const booking_count = useSelector(
    (state: IAppState) => state.notifications.allAppointmentCounts
  );
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View style={styles.circleBtn}>
        {booking_count.booking_result_count > 0 ? (
          <View style={styles.redDot} />
        ) : null}

        <TouchableOpacity
          onPress={() =>
            onPress
              ? onPress()
              : navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                  screen: SCREENS.COVID19HOME,
                })
          }
        >
          <Covid19 />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.covidText}>{t('pages.covid.header')}</Text>
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
      elevation: 3,
      marginBottom: 5,
    },
    covidText: {
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
    },
  });
