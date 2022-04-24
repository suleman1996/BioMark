import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { GlobalFonts } from 'utils/theme/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';

type Props = {
  onPress: any;
  title: string;
  disabled?: boolean;
};

const ButtonComponent = ({ onPress, title, disabled }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
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
    fontSize: responsiveFontSize(18),
  },
});
