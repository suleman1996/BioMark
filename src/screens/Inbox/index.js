import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.light,
    fontSize: 18,
  },
});
