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
    circle: {
      width: widthToDp(20),
      height: widthToDp(20),
      backgroundColor: colors.lightGreen,
      borderRadius: widthToDp(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    text1: {
      fontSize: responsiveFontSize(25),
      fontFamily: GlobalFonts.medium,
      color: colors.darkPrimary,
      textAlign: 'center',
    },
    text2: {
      fontSize: responsiveFontSize(25),
      fontFamily: GlobalFonts.medium,
      color: colors.lightGreen,
      textAlign: 'center',
    },
    text3: {
      fontSize: responsiveFontSize(23),
      fontFamily: GlobalFonts.extraLight,
      color: colors.black,
    },
    text4: {
      fontSize: responsiveFontSize(19),
      fontFamily: GlobalFonts.extraLight,
      color: colors.black,
    },
    headerLine: {
      width: widthToDp(82),
      borderWidth: 1,
      borderColor: colors.lightPrimary,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      width: widthToDp(84),
    },
    title: {
      fontSize: responsiveFontSize(20),
      fontFamily: GlobalFonts.medium,
      color: colors.black,
    },
    content: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.extraLight,
      color: colors.darkPrimary,
    },
    itemContainer: {
      flex: 1,
    },
  });

export default makeStyles;
