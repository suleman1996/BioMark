import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react'
import {GlobalColors} from '../../../utils/theme/globalColors'
import {GlobalFonts} from '../../../utils/theme/fonts';
import {heightToDp, widthToDp} from '../../../utils/functions/responsiveDimentions'
import { responsiveFontSize } from '../../../utils/functions/responsiveText';
import { GlobalStyles } from '../../../utils/theme/globalStyles';

type Props = {
  onPress: any;
  title: string;
  disabled: boolean;
  bg?: string;
  color?: string
};

const ButtonComponent = ({onPress, title, disabled, bg, color}: Props) => {
  const ifBg = bg ? {backgroundColor: bg} : {};
  const ifColor = color ? {color: color} : {}
  const ifDisabled = disabled
    ? {backgroundColor: 'lightgray'}
    : {backgroundColor: GlobalColors.primary};
  const ifDisbaledText = disabled
    ? {color: 'gray'}
    : {color: GlobalColors.white};
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[styles.container, ifDisabled, ifBg]}>
      <Text style={[styles.text, ifDisbaledText, ifColor]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  container: {
    height: heightToDp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: widthToDp(2.5),
    width: '100%',
  },
  text: {
    fontFamily: GlobalFonts.medium,
    fontSize: responsiveFontSize(20)
  },
});