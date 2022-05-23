import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    textInput: {
      backgroundColor: colors.inputBg,
      fontSize: responsiveFontSize(18),
      height: 45,
      borderRadius: 5,
      fontFamily: fonts.mulishRegular,
    },
  });
export default makeStyles;
