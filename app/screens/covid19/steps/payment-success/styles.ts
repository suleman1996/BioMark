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
    },
    scrollView: {
      flexGrow: 1,
      alignItems: 'center',
      paddingTop: heightToDp(2),
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
    innerView: {
      borderColor: colors.inputBg,
      borderWidth: 2,
      borderRadius: widthToDp(3),
      marginBottom: heightToDp(1.5),
      width: '100%',
      padding: widthToDp(3),
    },
    headerLine: {
      width: '100%',
      borderWidth: 1,
      borderColor: colors.lightPrimary,
    },
    title1: {
      fontSize: responsiveFontSize(23),
      fontFamily: GlobalFonts.bold,
      color: colors.darkPrimary,
      marginTop: heightToDp(2),
    },
    title2: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.extraLight,
      color: colors.black,
    },
    title3: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.bold,
      color: colors.black,
      marginTop: heightToDp(2),
      textAlign: 'center',
    },
    title3inner: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.extraLight,
      color: colors.black,
    },
    title4: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.medium,
      color: colors.black,
      marginTop: heightToDp(2),
      textAlign: 'center',
    },
    title4inner: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.extraLight,
      color: colors.black,
    },
    userCodeText: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.medium,
      color: colors.black,
    },
    stepContainer: {
      borderBottomWidth: 2,
      borderColor: colors.inputBg,
      paddingBottom: heightToDp(1),
    },
    stepIndicator: {
      labelSize: 12,
      stepStrokeWidth: 0,
      stepIndicatorSize: 40,
      currentStepIndicatorSize: 40,
      stepIndicatorLabelFontSize: 15,
      currentStepIndicatorLabelFontSize: 15,
      stepStrokeCurrentColor: colors.blue,
      stepIndicatorCurrentColor: colors.blue,
      stepIndicatorLabelCurrentColor: colors.white,
      stepIndicatorUnFinishedColor: colors.lightBlue,
      stepIndicatorFinishedColor: colors.blue,
      labelColor: colors.lightGrey,
      currentStepLabelColor: colors.darBlue,
      separatorFinishedColor: colors.blue,
      separatorUnFinishedColor: colors.lightBlue,
    },
    bottom2Btns: {
      position: 'absolute',
      bottom: 0,
      justifyContent: 'space-between',
      width: widthToDp(88),
      paddingBottom: heightToDp(2),
      backgroundColor: colors.white,
      alignItems: 'center',
    },
    btn: {
      width: widthToDp(40),
      paddingVertical: widthToDp(2),
      alignItems: 'center',
      borderRadius: widthToDp(3),
      backgroundColor: colors.bgContainer,
    },
    btnEnable: {
      width: widthToDp(40),
      paddingVertical: widthToDp(2),
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
    circle: {
      width: widthToDp(28),
      height: widthToDp(28),
      backgroundColor: colors.primary,
      borderRadius: widthToDp(14),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default makeStyles;
