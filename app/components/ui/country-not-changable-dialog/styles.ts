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
      borderRadius: widthToDp(1),
      marginBottom: heightToDp(1.5),
      width: widthToDp(88),
      padding: widthToDp(4),
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    title: {
      fontSize: responsiveFontSize(26),
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.medium,
      paddingHorizontal: widthToDp(3),
      textAlign: 'center',
      marginBottom: 15,
    },
    desc: {
      fontSize: responsiveFontSize(21),
      color: colors.lightDark,
      fontFamily: GlobalFonts.extraLight,
      paddingHorizontal: widthToDp(1.5),
      lineHeight: 21,
      textAlign: 'left',
    },
    bottom2Btns: {
      flexDirection: 'row',
      bottom: 0,
      width: '100%',
      backgroundColor: colors.white,
      paddingTop: heightToDp(3),
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn: {
      width: widthToDp(35),
      paddingVertical: widthToDp(1.5),
      alignItems: 'center',
      borderRadius: widthToDp(2),
      backgroundColor: colors.bgContainer,
      borderWidth: 1,
      borderColor: colors.inactive,
    },
    btnEnable: {
      width: widthToDp(78),
      paddingVertical: widthToDp(2),
      alignItems: 'center',
      borderRadius: widthToDp(2),
      backgroundColor: colors.primary,
    },
    btnText: {
      fontFamily: GlobalFonts.bold,
      fontSize: responsiveFontSize(19),
      color: colors.red,
    },
    btnText2: {
      fontFamily: GlobalFonts.bold,
      fontSize: responsiveFontSize(19),
      color: colors.white,
    },
  });

export default makeStyles;
