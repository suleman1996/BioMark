import fonts from 'assets/fonts';
import BioBookings from 'components/svg/bio-bookings';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { navigate } from 'services/nav-ref';
import SCREENS from '../../navigation/constants/index';

export default function TestBookinButton() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <TouchableOpacity activeOpacity={0.6}>
        <TouchableOpacity
          onPress={() =>
            navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
              screen: SCREENS.COVID19BOOKINGS,
            })
          }
          activeOpacity={0.6}
          style={styles.circleBtn}
        >
          <BioBookings width={7} height={7} />
        </TouchableOpacity>
      </TouchableOpacity>
      <View>
        <Text style={styles.healthText}>Bookings</Text>
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
