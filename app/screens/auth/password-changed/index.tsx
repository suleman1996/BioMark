import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';

import { Lock } from 'assets/svgs/index';

import { styles } from './styles';

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
        navigate(SCREENS.NESTED_ACCOUNT_NAVIGATOR, {
          screen: SCREENS.SETTINGS,
        });
        return;
      } else {
        navigate(SCREENS.LOGIN);
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
