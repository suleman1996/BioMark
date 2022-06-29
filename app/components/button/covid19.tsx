import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Covid19 } from 'assets/svgs/index';
import fonts from 'assets/fonts';
import SCREENS from '../../navigation/constants';
import { navigate } from '../../services/nav-ref';
import { useTranslation } from 'react-i18next';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Covid19Btn({ onPress }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View style={styles.circleBtn}>
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
  });
