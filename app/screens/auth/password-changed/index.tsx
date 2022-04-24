import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import fonts from 'assets/fonts';
import colors from 'assets/colors';
import Lock from 'assets/svgs/lock';
import { navigate } from 'services/nav-ref';
import { Nav_Screens } from 'navigation/constants';

export default function PasswordChanged() {
  useEffect(() => {
    setTimeout(() => {
      navigate(Nav_Screens.LoginScreen);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Lock height={100} width={100} />
      </View>
      <Text style={styles.text}>Your Password has been changed!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.bold,
    color: colors.blue,
    fontSize: 18,
  },
});
