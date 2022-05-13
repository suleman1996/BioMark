import React from 'react';
import { View, FlatList } from 'react-native';
import ButtonComponent from 'components/base/button';

import slides from './slides';
import OnboardingItem from '../onboarding/onboarding-items';
import colors from 'assets/colors';
import { styles } from './styles';

const Onboarding = () => {
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
          <ButtonComponent title="Sign up" onPress={undefined} />
        </View>
        <ButtonComponent
          title="Login"
          onPress={undefined}
          color={colors.black}
          bg={colors.lightBlue}
        />
      </View>
    </View>
  );
};

export default Onboarding;
