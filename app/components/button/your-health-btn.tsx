import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'react-native-paper';
import SCREENS from '../../navigation/constants/index';

import fonts from 'assets/fonts';
//import colors from 'assets/colors';

import { YourHealth } from 'assets/svgs/index';

export default function YourHealthBtn() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { YOUR_HEALTH } = SCREENS;
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View style={styles.circleBtn}>
        <TouchableOpacity onPress={() => navigation.navigate(YOUR_HEALTH)}>
          <YourHealth />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.healthText}>Your Health</Text>
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
      shadowOpacity: 1,
      shadowRadius: 1.0,
      elevation: 3,
      marginBottom: 5,
    },
    healthText: {
      fontFamily: fonts.bold,
      fontSize: 15,
      color: colors.heading,
    },
  });
