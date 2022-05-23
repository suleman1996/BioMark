import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { makeStyles } from './styles';

export default function SelectedButton({}) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return <View style={styles.view} />;
}
