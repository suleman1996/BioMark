import { View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { Logo } from 'assets/svgs/index';

export default function Splash() {
  const navigations = useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      navigations.replace('Login');
    }, 2000);
  }, [navigations]);

  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
}
