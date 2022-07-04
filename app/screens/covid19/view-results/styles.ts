import { StyleSheet } from 'react-native';
// import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      height: heightToDp(150),
      alignItems: 'center',
      // paddingTop: heightToDp(2),
    },
    parent: {
      borderColor: colors.inputBg,
      borderWidth: 2,
      borderRadius: widthToDp(3),
      marginBottom: heightToDp(1.5),
      width: widthToDp(88),
      padding: widthToDp(3),
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    whoText: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.bold,
      color: colors.darkPrimary,
    },
    header2: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.medium,
      color: colors.lightGray,
    },
    testCodeText: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.extraLight,
      color: colors.lightGray,
    },
    contentContainer: {
      width: widthToDp(84),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    testType: {
      fontSize: responsiveFontSize(22),
      fontFamily: GlobalFonts.regular,
      color: colors.black,
      width: '60%',
    },
    testResult: {
      backgroundColor: colors.red,
      paddingHorizontal: widthToDp(4),
      paddingVertical: heightToDp(0.3),
      borderRadius: widthToDp(2),
    },
    testResultText: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.regular,
      color: colors.white,
    },
    dateText: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.extraLight,
      color: colors.darkPrimary,
      width: '100%',
    },
    emptyResult: {
      flex: 1,
      width: widthToDp(88),
      height: heightToDp(85),
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyTxt1: {
      fontSize: responsiveFontSize(25),
      fontFamily: GlobalFonts.semiBold,
      color: colors.darkPrimary,
    },
    emptyTxt2: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.extraLight,
      color: colors.black,
    },
  });

export default makeStyles;
