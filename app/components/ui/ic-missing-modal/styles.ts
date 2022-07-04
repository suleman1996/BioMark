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
      fontSize: responsiveFontSize(25),
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.medium,
      paddingHorizontal: widthToDp(3),
      textAlign: 'center',
      marginBottom: 15,
    },
    crossContainer: {
      position: 'absolute',
      left: 0,
      paddingTop: heightToDp(2),
      paddingLeft: heightToDp(2),
    },
    desc: {
      fontSize: responsiveFontSize(19),
      color: colors.lightDark,
      fontFamily: GlobalFonts.light,
      paddingHorizontal: widthToDp(1.5),
      lineHeight: 26,
      textAlign: 'center',
    },
    bottom2Btns: {
      flexDirection: 'row',
      bottom: 0,
      width: '100%',
      backgroundColor: colors.white,
      paddingTop: heightToDp(3),
      justifyContent: 'space-between',
    },
    btn: {
      width: widthToDp(35),
      paddingVertical: widthToDp(2.5),
      alignItems: 'center',
      borderRadius: widthToDp(2),
      backgroundColor: colors.bgContainer,
      borderWidth: 1,
      borderColor: colors.inputBg,
      justifyContent: 'center',
    },
    btnEnable: {
      width: widthToDp(35),
      paddingVertical: widthToDp(2.5),
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
