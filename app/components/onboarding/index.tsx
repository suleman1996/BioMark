import React from 'react';
import { View, FlatList } from 'react-native';
import ButtonComponent from 'components/base/button';
import { useNavigation } from '@react-navigation/native';

import slides from './slides';
import OnboardingItem from '../onboarding/onboarding-items';
import colors from 'assets/colors';
import SCREENS from '../../navigation/constants/index';
import { styles } from './styles';
import { setIsOnboarding } from 'services/async-storage/auth-async-storage';

const Onboarding = () => {
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
      <View style={styles.buttonView}>
        <View style={[styles.buttonView, { marginBottom: 10 }]}>
          <ButtonComponent
            title="Sign up"
            onPress={() => {
              navigations.replace(SCREENS.SIGNUP), setIsOnboarding(false);
            }}
          />
        </View>
        <ButtonComponent
          title="Login"
          onPress={() => {
            navigations.replace(SCREENS.LOGIN), setIsOnboarding(false);
          }}
          color={colors.black}
          bg={colors.lightBlue}
        />
      </View>
    </View>
  );
};

export default Onboarding;
