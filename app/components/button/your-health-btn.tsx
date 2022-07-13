import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TouchableRipple, useTheme } from 'react-native-paper';
import SCREENS from '../../navigation/constants/index';

import fonts from 'assets/fonts';

import { YourHealth } from 'assets/svgs/index';
import { useTranslation } from 'react-i18next';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthToDp } from 'utils/functions/responsive-dimensions';

export default function YourHealthBtn() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { YOUR_HEALTH } = SCREENS;
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View style={styles.circleBtn}>
        <TouchableRipple
          onPress={() => navigation.navigate(YOUR_HEALTH)}
          style={styles.btn}
          rippleColor={'rgba(0,128,128,0.05)'}
        >
          <YourHealth />
        </TouchableRipple>
      </View>

      <View>
        <Text style={styles.healthText}>
          {t('pages.search.yourHealth.label')}
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
      width: widthToDp(14),
      height: widthToDp(14),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: Platform.OS == 'ios' ? 'visible' : 'hidden',
    },
    healthText: {
      fontFamily: fonts.bold,
      fontSize: RFValue(15),
      color: colors.heading,
    },
    btn: {
      width: widthToDp(14),
      height: widthToDp(14),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: widthToDp(7.5),
    },
  });
