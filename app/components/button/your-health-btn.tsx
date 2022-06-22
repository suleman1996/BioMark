import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'react-native-paper';
import SCREENS from '../../navigation/constants/index';

import fonts from 'assets/fonts';
//import colors from 'assets/colors';

import { YourHealth } from 'assets/svgs/index';
import { useTranslation } from 'react-i18next';

export default function YourHealthBtn() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { YOUR_HEALTH } = SCREENS;
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate(YOUR_HEALTH)}>
        <View style={styles.circleBtn}>
          <YourHealth />
        </View>
      </TouchableOpacity>
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
    healthText: {
      fontFamily: fonts.bold,
      fontSize: 15,
      color: colors.heading,
    },
  });
