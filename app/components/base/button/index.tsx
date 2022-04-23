import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {GlobalColors} from '../../../utils/theme/globalColors';
import {GlobalFonts} from '../../../utils/theme/fonts';
import {
  heightToDp,
  widthToDp,
} from '../../../utils/functions/responsiveDimentions';
import {responsiveFontSize} from '../../../utils/functions/responsiveText';

type Props = {
  onPress: any;
  title: string;
};

const ButtonComponent = ({onPress, title,disabled}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
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
