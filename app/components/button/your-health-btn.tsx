import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import { useTheme } from 'react-native-paper';

import fonts from 'assets/fonts';
//import colors from 'assets/colors';

import { YourHealth } from 'assets/svgs/index';

export default function YourHealthBtn() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity>
        <View style={styles.circleBtn}>
          <YourHealth />
        </View>
      </TouchableOpacity>
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
  });
