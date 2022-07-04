import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';

import BioDependants from 'components/svg/bio-dependants';
import SCREENS from '../../navigation/constants/index';
import fonts from 'assets/fonts';
import { t } from 'i18next';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthToDp } from 'utils/functions/responsive-dimensions';

export default function DependentButton() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { NESTED_ACCOUNT_NAVIGATOR } = SCREENS;
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View style={styles.circleBtn}>
        <TouchableRipple
          onPress={() =>
            navigation.navigate(NESTED_ACCOUNT_NAVIGATOR, {
              screen: SCREENS.DEPENDANTS,
            })
          }
          style={styles.btn}
          rippleColor={'rgba(0,128,128,0.05)'}
        >
          <BioDependants width={7} height={7} />
        </TouchableRipple>
      </View>
      <View>
        <Text style={styles.healthText}>
          {t('pages.covid.home.dependants')}
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
    },
  });
