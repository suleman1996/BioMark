import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

type Props = {
  disabled?: boolean;
  icon: any;
};

const CircleBtn = ({ disabled, icon }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const ifDisabled = disabled ? { backgroundColor: colors.fieldGrey } : {};

  return <View style={[styles.main, ifDisabled]}>{icon}</View>;
};

export default CircleBtn;
