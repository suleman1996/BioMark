import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import AppLogo from '../../assets/svgs/logo-name';

export default function Splash() {
  const navigations = useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      navigations.replace('Login');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <AppLogo />
    </View>
  );
}
