import { StyleSheet } from 'react-native';
// import fonts from 'assets/fonts';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    parent: {
      borderColor: colors.inputBg,
      borderWidth: 2,
      borderRadius: widthToDp(3),
      marginBottom: heightToDp(1.5),
    },
    headerLine: {
      width: widthToDp(86),
      borderWidth: 1,
      borderColor: colors.lightPrimary,
    },
    container: {
      backgroundColor: colors.white,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: widthToDp(86),
      paddingVertical: widthToDp(2.5),
      alignItems: 'center',

      paddingHorizontal: widthToDp(2),
    },
    bookingStatusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleText: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.bold,
      color: colors.darkPrimary,
    },
    statusText: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.medium,
      color: colors.red,
    },
    expendedContainer: {
      paddingHorizontal: widthToDp(2),
      paddingVertical: heightToDp(1),
    },
    dependantConatiner: {
      flexDirection: 'row',
      alignItems: 'center',
      width: widthToDp(86),
      justifyContent: 'space-between',
      borderColor: colors.inputBg,
      borderWidth: 2,
      borderRadius: widthToDp(3),
      marginBottom: heightToDp(0.5),
      paddingHorizontal: widthToDp(3),
      paddingVertical: heightToDp(1),
      marginTop: heightToDp(1),
    },
    dName: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
    },
    dType: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.regular,
      color: colors.darkPrimary,
    },
    innerTitle: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
    },
    getTestedContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: widthToDp(86),
      paddingHorizontal: widthToDp(10),
    },
    btnContainer: {
      alignItems: 'center',
    },
    innerSmallTxt: {
      fontSize: responsiveFontSize(13),
      fontFamily: GlobalFonts.light,
      color: colors.inactive,
    },
    bottomBtnContainer: {
      flexDirection: 'row',
      width: widthToDp(86),
      justifyContent: 'space-between',
      marginTop: heightToDp(2),
    },
    bottomBtn: {
      backgroundColor: colors.fieldGrey,
      paddingHorizontal: widthToDp(8),
      paddingVertical: widthToDp(2),
      borderRadius: widthToDp(2),
    },
    bottomBtnText: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.regular,
      color: colors.inactive,
    },
  });

export default makeStyles;
