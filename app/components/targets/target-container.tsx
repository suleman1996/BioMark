import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import makeStyles from './styles';

interface Props {
  children: Element | Element[] | null;
}

export default function TargetContainer({ children }: Props) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.TabContainer}>
      <Text style={styles.yourTargetsHeading}>
        {t('pages.hba1cTargets.title')}
      </Text>
      {children}
    </View>
  );
}
