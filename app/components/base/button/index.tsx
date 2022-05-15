import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'utils/functions/responsive-text';

import { GlobalColors } from 'utils/theme/global-colors';

import { styles } from './styles';

type Props = {
  onPress: any;
  title: string;
  disabled?: boolean;
  bg?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
};

const ButtonComponent = ({
  onPress,
  title,
  disabled,
  bg,
  color,
  fontFamily,
  fontSize,
}: Props) => {
  const ifBg = bg ? { backgroundColor: bg } : {};
  const ifColor = color ? { color: color } : {};
  const ifDisabled = disabled
    ? { backgroundColor: 'lightgray' }
    : { backgroundColor: GlobalColors.primary };
  const ifDisabledText = disabled
    ? { color: 'gray' }
    : { color: GlobalColors.white };
  const ifFontFamily = fontFamily ? { fontFamily: fontFamily } : {};
  const ifFontSize = fontSize ? { fontSize: responsiveFontSize(fontSize) } : {};

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[styles.container, ifDisabled, ifBg]}
      disabled={disabled}
    >
      <Text
        style={[styles.text, ifDisabledText, ifColor, ifFontFamily, ifFontSize]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
