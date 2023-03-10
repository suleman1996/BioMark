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
      paddingBottom: heightToDp(10),
    },
    parent: {
      borderColor: colors.inputBg,
      borderWidth: 2,
      borderRadius: widthToDp(3),
      marginBottom: heightToDp(1.5),
      width: widthToDp(88),
      padding: widthToDp(3),
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
    innerTitle: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
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
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottom2Btns: {
      position: 'absolute',
      flexDirection: 'row',
      bottom: 0,
      justifyContent: 'space-between',
      width: widthToDp(88),
      paddingBottom: heightToDp(2),
      backgroundColor: colors.white,
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
  });

export default makeStyles;
