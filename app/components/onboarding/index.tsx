import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';

import ButtonComponent from 'components/base/button';
import { useNavigation } from '@react-navigation/native';

import slides from './slides';
import OnboardingItem from '../onboarding/onboarding-items';
import SCREENS from '../../navigation/constants/index';
import { setIsOnboarding } from 'services/async-storage/auth-async-storage';

import makeStyles from './styles';

const Onboarding = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const navigations = useNavigation();
  return (
    <View style={styles.OBcontainer}>
      <View style={styles.cardView}>
        <FlatList
          data={slides}
          renderItem={({ item, index }) => (
            <OnboardingItem item={item} index={index} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
        />
      </View>
      <View style={styles.buttonViewOut}>
        <View style={[styles.buttonView, { marginBottom: 10 }]}>
          <ButtonComponent
            style={styles.buttonSelf}
            title="Sign up"
            onPress={() => {
              navigations.navigate(SCREENS.SIGNUP), setIsOnboarding(false);
            }}
          />
        </View>
        <View style={[styles.buttonView, { marginBottom: 10 }]}>
          <ButtonComponent
            style={styles.buttonSelf}
            title="Login"
            onPress={() => {
              navigations.replace(SCREENS.LOGIN), setIsOnboarding(false);
            }}
            color={colors.black}
            bg={colors.lightBlue}
          />
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
