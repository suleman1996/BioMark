import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { StyleSheet } from 'react-native';
import fonts from 'assets/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: widthToDp(4),
      width: widthToDp(86),
      paddingVertical: heightToDp(2),
      backgroundColor: colors.lightPrimary,
    },
    iconContainer: {
      width: widthToDp(5),
    },
    contentContainer: {
      width: widthToDp(60),
      paddingTop: heightToDp(1),
      paddingLeft: widthToDp(4),
      paddingRight: widthToDp(6),
    },
    dateText: {
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(20),
      color: colors.darkGray,
    },
    contentHeaderText: {
      fontFamily: fonts.bold,
      fontSize: responsiveFontSize(30),
      lineHeight: 35,
      color: colors.darkPrimary,
      marginTop: -4,
    },
    contentext: {
      fontFamily: fonts.semiBold,
      fontSize: responsiveFontSize(25),
      color: colors.darkPrimary,
    },
  });
export default makeStyles;
