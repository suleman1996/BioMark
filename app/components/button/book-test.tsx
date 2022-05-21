import { useNavigation } from '@react-navigation/native';
import fonts from 'assets/fonts';
import BioBookTest from 'components/svg/bio-book-test';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import SCREENS from '../../navigation/constants/index';

export default function BookTestButton() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { YOUR_HEALTH } = SCREENS;
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate(YOUR_HEALTH)}>
        <View style={styles.circleBtn}>
          <BioBookTest width={7} height={7} />
        </View>
      </TouchableOpacity>
      <View>
        <Text style={styles.healthText}>Book Tests</Text>
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
