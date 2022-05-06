import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import fonts from 'assets/fonts';
import colors from 'assets/colors';
import { Lock } from 'assets/svgs/index';
import { navigate } from 'services/nav-ref';
import { Nav_Screens } from 'navigation/constants';

type Props = {
  route: any;
};

export default function PasswordChanged(props: Props) {
  const { route } = props;
  /*eslint-disable */
  const flag = route?.params?.flag;
  useEffect(() => {
    setTimeout(() => {
      if (flag == 1) {
        navigate(Nav_Screens.NestedAccountNavigator, {
          screen: Nav_Screens.Settings,
        });
        return;
      } else {
        navigate(Nav_Screens.LoginScreen);
      }
    }, 2000);
  }, []);
  /*eslint-enable */

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
