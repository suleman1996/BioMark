import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.primary,
    height: heightToDp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: widthToDp(2.5),
    width: '100%',
  },
  text: {
    color: GlobalColors.white,
    fontFamily: GlobalFonts.medium,
    fontSize: responsiveFontSize(18),
  },
});
