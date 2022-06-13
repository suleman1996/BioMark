import { StyleSheet } from 'react-native';
// import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from './../../../utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      borderColor: colors.inputBg,
      borderWidth: 2,
      borderRadius: widthToDp(3),
      marginBottom: heightToDp(1.5),
      width: widthToDp(88),
      padding: widthToDp(3),
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    title: {
      fontSize: responsiveFontSize(25),
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.medium,
      paddingHorizontal: widthToDp(3),
      textAlign: 'center',
    },
    desc: {
      fontSize: responsiveFontSize(18),
      color: colors.lightDark,
      fontFamily: GlobalFonts.light,
      paddingHorizontal: widthToDp(3),
      textAlign: 'center',
    },
    bottom2Btns: {
      flexDirection: 'row',
      bottom: 0,
      width: '100%',
      paddingBottom: heightToDp(2),
      backgroundColor: colors.white,
      paddingTop: heightToDp(3),
      justifyContent: 'space-between',
    },
    btn: {
      width: widthToDp(35),
      paddingVertical: widthToDp(1.5),
      alignItems: 'center',
      borderRadius: widthToDp(3),
      backgroundColor: colors.bgContainer,
      borderWidth: 1,
      borderColor: colors.inactive,
    },
    btnEnable: {
      width: widthToDp(35),
      paddingVertical: widthToDp(1.5),
      alignItems: 'center',
      borderRadius: widthToDp(3),
      backgroundColor: colors.primary,
    },
    btnText: {
      fontFamily: GlobalFonts.medium,
      fontSize: responsiveFontSize(19),
      color: colors.red,
    },
    btnText2: {
      fontFamily: GlobalFonts.medium,
      fontSize: responsiveFontSize(19),
      color: colors.white,
    },
  });

export default makeStyles;
