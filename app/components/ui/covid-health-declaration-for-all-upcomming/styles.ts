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
      backgroundColor: colors.white,
    },
    title: {
      fontSize: responsiveFontSize(21),
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.medium,
      paddingHorizontal: widthToDp(3),
      paddingVertical: heightToDp(1.2),
    },
    horizontalLine: {
      width: widthToDp(98),
      borderWidth: 1,
      borderColor: colors.primary,
      opacity: 0.4,
    },
    headerLine: {
      width: '100%',
      borderWidth: 1,
      borderColor: colors.lightPrimary,
    },
    desc: {
      fontSize: responsiveFontSize(17),
      color: colors.lightDark,
      fontFamily: GlobalFonts.light,
      paddingHorizontal: widthToDp(3),
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
    parent: {
      borderColor: colors.inputBg,
      borderWidth: 2,
      borderRadius: widthToDp(3),
      marginBottom: heightToDp(1.5),
      paddingHorizontal: widthToDp(1),
    },
    cardParent: {
      paddingHorizontal: widthToDp(2),
      marginTop: heightToDp(2),
    },
    cardContainer: {
      backgroundColor: colors.white,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingVertical: widthToDp(2.5),
      alignSelf: 'center',
      paddingHorizontal: widthToDp(2),
    },
    expendedContainer: {
      paddingHorizontal: widthToDp(2),
      paddingVertical: heightToDp(1),
    },

    innerTitle: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
    },
    q: {
      fontSize: responsiveFontSize(20),
      color: colors.lightDark,
      fontFamily: GlobalFonts.light,
      marginTop: heightToDp(2),
    },

    bottom2Btns: {
      flexDirection: 'row',
      bottom: 0,
      width: '100%',
      paddingBottom: heightToDp(2),
      backgroundColor: colors.white,
      paddingTop: heightToDp(3),
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
    btn: {
      width: widthToDp(35),
      paddingVertical: widthToDp(1.5),
      alignItems: 'center',
      borderRadius: widthToDp(3),
      backgroundColor: colors.bgContainer,
    },
    btnEnable: {
      width: widthToDp(35),
      paddingVertical: widthToDp(1.5),
      alignItems: 'center',
      borderRadius: widthToDp(3),
      backgroundColor: colors.primary,
    },
    btnDisable: {
      width: widthToDp(35),
      paddingVertical: widthToDp(1.5),
      alignItems: 'center',
      borderRadius: widthToDp(3),
      backgroundColor: colors.fieldGrey,
    },
    btnText: {
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(19),
      color: colors.lightGray,
    },
    btnText2: {
      fontFamily: GlobalFonts.medium,
      fontSize: responsiveFontSize(19),
      color: colors.white,
    },
    radio: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radioText: {
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(19),
    },
  });

export default makeStyles;
