import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import makeStyles from './styles';

interface Props {
  children: Element | Element[] | null;
}

export default function TargetContainer({ children }: Props) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.TabContainer}>
      <Text style={styles.yourTargetsHeading}>Your Targets</Text>
      {children}
    </View>
  );
}
