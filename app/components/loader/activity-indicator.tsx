import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { BarIndicator } from 'react-native-indicators';

import makeStyles from './styles';

type Props = {
  visible: boolean;
  fontSize?: any;
};

export default function ActivityIndicator({
  visible = false,
  fontSize,
}: Props) {
  const { colors } = useTheme();
  const styles = makeStyles();
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overLay}>
      <BarIndicator color={colors.blue} size={fontSize ? fontSize : 40} />
    </View>
  );
}
