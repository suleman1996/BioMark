import { View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { getOnboarding } from '../../services/async-storage/auth-async-storage';

import SCREENS from 'navigation/constants';

import { Logo } from 'assets/svgs/index';

import makeStyles from './styles';

export default function Splash() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const navigations = useNavigation();

  const [onBoarding, setOnboarding] = React.useState('');

  const getUser = async () => {
    const onboardingg = await getOnboarding();

    setOnboarding(onboardingg);

    setTimeout(() => {
      onBoarding == 'false'
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
