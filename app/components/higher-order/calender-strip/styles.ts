import { StyleSheet } from 'react-native';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.inputBg,
      borderRadius: widthToDp(2),
    },
    iconStyle: {
      display: 'none',
    },
    highlightDateNumberStyle: {
      color: colors.white,
      minWidth: widthToDp(7),
      fontFamily: GlobalFonts.regular,
      fontSize: responsiveFontSize(15),
      backgroundColor: colors.primary,
    },
    highLightDateName: {
      color: colors.white,
      minWidth: widthToDp(7),
      fontFamily: GlobalFonts.regular,
      fontSize: responsiveFontSize(13),
      fontWeight: '600',
      backgroundColor: colors.primary,
    },
    disabledDateNameStyle: {
      color: 'black',
      fontFamily: GlobalFonts.regular,
      fontSize: responsiveFontSize(13),
      fontWeight: '600',
    },
    disabledDateNumberStyle: {
      color: 'black',
      fontFamily: GlobalFonts.regular,
      fontSize: responsiveFontSize(13),
      fontWeight: '600',
    },
  });
export default makeStyles;
