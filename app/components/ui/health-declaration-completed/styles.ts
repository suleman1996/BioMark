import { StyleSheet } from 'react-native';
// import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from '../../../utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      borderColor: colors.inputBg,
      borderWidth: 2,
      borderRadius: widthToDp(3),
      marginBottom: heightToDp(1.5),
      width: widthToDp(98),
      padding: widthToDp(3),
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    title: {
      fontSize: responsiveFontSize(27),
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.bold,
      paddingTop: heightToDp(2),
      textAlign: 'center',
    },
    desc: {
      fontSize: responsiveFontSize(18),
      color: colors.lightDark,
      fontFamily: GlobalFonts.light,
      paddingHorizontal: widthToDp(3),
      textAlign: 'center',
    },
    desc2: {
      fontSize: responsiveFontSize(23),
      color: colors.black,
      fontFamily: GlobalFonts.regular,
      paddingTop: heightToDp(2),
      textAlign: 'center',
    },
    bottom2Btns: {
      bottom: 0,
      width: '100%',
      paddingBottom: heightToDp(2),
      backgroundColor: colors.white,
      paddingTop: heightToDp(3),
      alignItems: 'center',
    },
    btn: {
      width: '95%',
      paddingVertical: widthToDp(1.5),
      alignItems: 'center',
      borderRadius: widthToDp(3),
      backgroundColor: colors.bgContainer,
    },
    btnEnable: {
      width: '95%',
      paddingVertical: widthToDp(1.5),
      alignItems: 'center',
      borderRadius: widthToDp(3),
      backgroundColor: colors.primary,
      marginBottom: heightToDp(1),
    },
    btnText: {
      fontFamily: GlobalFonts.medium,
      fontSize: responsiveFontSize(19),
      color: colors.darkPrimary,
      paddingVertical: heightToDp(1),
    },
    btnText2: {
      fontFamily: GlobalFonts.medium,
      fontSize: responsiveFontSize(19),
      color: colors.white,
      paddingVertical: heightToDp(1),
    },
  });

export default makeStyles;
