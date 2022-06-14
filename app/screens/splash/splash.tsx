import { View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { getOnboarding } from '../../services/async-storage/auth-async-storage';

import SCREENS from 'navigation/constants';

import { Logo } from 'assets/svgs/index';

import makeStyles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const navigations = useNavigation();

  const getUser = async () => {
    const onboardingg = await getOnboarding();

    if (onboardingg) {
      await AsyncStorage.setItem('onBoarding', 'true');
    }
    setTimeout(() => {
      !onboardingg
        ? navigations.replace(SCREENS.LOGIN)
        : navigations.replace(SCREENS.ONBOARDING);
    }, 2000);
  };

  React.useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigations]);

  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
}
