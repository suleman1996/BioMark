import fonts from 'assets/fonts';
import { StyleSheet } from 'react-native';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: widthToDp(85),
      padding: widthToDp(4),
      borderRadius: widthToDp(3),
      backgroundColor: colors.white,
      alignItems: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: heightToDp(2),
      paddingHorizontal: widthToDp(4),
    },
    heading: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.bold,
      color: colors.red,
    },
    subHeading: {
      fontSize: responsiveFontSize(15),
      fontFamily: fonts.mulishRegular,
      textAlign: 'center',
    },
    yesBtn: {
      paddingHorizontal: widthToDp(11),
      paddingVertical: widthToDp(2),
      borderWidth: 0.5,
      borderRadius: widthToDp(3),
    },
    noBtn: {
      paddingHorizontal: widthToDp(11),
      paddingVertical: widthToDp(2),
      backgroundColor: colors.primary,
      borderRadius: widthToDp(3),
    },
    yesBtnText: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.regular,
      color: colors.red,
    },
    noBtnText: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.regular,
      color: colors.white,
    },
  });
export default makeStyles;
