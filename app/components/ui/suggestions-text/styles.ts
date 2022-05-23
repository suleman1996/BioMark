import { StyleSheet } from 'react-native';
// import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: widthToDp(88),
      marginHorizontal: widthToDp(6),
      marginTop: heightToDp(2),
      justifyContent: 'center',
      alignItems: 'center',
      padding: widthToDp(4),
      backgroundColor: colors.inputBg,
      borderRadius: widthToDp(2),
    },
    text: {
      fontFamily: GlobalFonts.semiBold,
      fontSize: responsiveFontSize(20),
    },
  });

export default makeStyles;
