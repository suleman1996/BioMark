import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';

import { Lock } from 'assets/svgs/index';

import makeStyles from './styles';
import { useTranslation } from 'react-i18next';
type Props = {
  route: any;
};

export default function PasswordChanged(props: Props) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

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
      <Text style={styles.text}>{t('common.passwordChangeSuccess')}</Text>
    </View>
  );
}
