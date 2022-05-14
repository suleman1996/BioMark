import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

import { GlobalColors } from 'utils/theme/global-colors';

import makeStyles from './styles';

type Props = {
  onPress: any;
  title: string;
  disabled?: boolean;
  bg?: string;
  color?: string;
};

const ButtonComponent = ({ onPress, title, disabled, bg, color }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const ifBg = bg ? { backgroundColor: bg } : {};
  const ifColor = color ? { color: color } : {};
  const ifDisabled = disabled
    ? { backgroundColor: 'lightgray' }
    : { backgroundColor: GlobalColors.primary };
  const ifDisabledText = disabled
    ? { color: 'gray' }
    : { color: GlobalColors.white };

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[styles.container, ifDisabled, ifBg]}
      disabled={disabled}
    >
      <Text style={[styles.text, ifDisabledText, ifColor]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
