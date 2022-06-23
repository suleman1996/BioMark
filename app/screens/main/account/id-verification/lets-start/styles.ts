import { StyleSheet } from 'react-native';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text1: {
      fontFamily: GlobalFonts.extraBold,
      fontSize: responsiveFontSize(40),
      color: colors.darkPrimary,
    },
    text2: {
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(22),
      color: colors.black,
      paddingHorizontal: widthToDp(10),
      textAlign: 'center',
    },
    image: {
      width: widthToDp(75),
    },
    backBtnContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: 10,
      left: 10,
    },
    backText: {
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(25),
      color: colors.darkPrimary,
    },
  });
export default styles;
