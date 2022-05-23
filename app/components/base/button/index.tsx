import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

import makeStyles from './styles';

type Props = {
  onPress: any;
  title: string;
  disabled?: boolean;
  bg?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  marginTop?: number;
};

const ButtonComponent = ({
  onPress,
  title,
  disabled,
  bg,
  color,
  fontFamily,
  fontSize,
  marginTop,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  let otherStyle = [];
  if (marginTop) {
    otherStyle.push({ marginTop: heightToDp(marginTop) });
  }

  const ifBg = bg ? { backgroundColor: bg } : {};
  const ifColor = color ? { color: color } : {};
  const ifDisabled = disabled
    ? { backgroundColor: 'lightgray' }
    : { backgroundColor: colors.primary };

  const ifDisabledText = disabled ? { color: 'gray' } : { color: colors.white };
  const ifFontFamily = fontFamily ? { fontFamily: fontFamily } : {};
  const ifFontSize = fontSize ? { fontSize: responsiveFontSize(fontSize) } : {};

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[styles.container, ifDisabled, ifBg, otherStyle]}
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
