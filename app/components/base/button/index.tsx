import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { GlobalColors } from 'utils/theme/global-colors';

import { styles } from './styles';

type Props = {
  onPress: any;
  title: string;
  disabled?: boolean;
  bg?: string;
  color?: string;
};

const ButtonComponent = ({ onPress, title, disabled, bg, color }: Props) => {
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
