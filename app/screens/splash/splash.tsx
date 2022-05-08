import { View } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

import SCREENS from 'navigation/constants';

import { Logo } from 'assets/svgs/index';

import styles from './styles';

export default function Splash() {
  const navigations = useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      navigations.replace(SCREENS.LOGIN);
    }, 2000);
  }, [navigations]);

  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
}
