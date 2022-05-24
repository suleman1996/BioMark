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
      labelColor: colors.lightGrey,
      currentStepLabelColor: colors.darBlue,
      separatorFinishedColor: colors.blue,
      separatorUnFinishedColor: colors.lightBlue,
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
