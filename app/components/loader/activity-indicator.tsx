import React from 'react';
import { View } from 'react-native';

import { BarIndicator } from 'react-native-indicators';

import colors from 'assets/colors';

import { styles } from './styles';

type Props = {
  visible: boolean;
  fontSize?: any;
};

export default function ActivityIndicator({
  visible = false,
  fontSize,
}: Props) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overLay}>
      <BarIndicator color={colors.blue} size={fontSize ? fontSize : 40} />
    </View>
  );
}
