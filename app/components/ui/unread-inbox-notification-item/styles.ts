import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { StyleSheet } from 'react-native';

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
      paddingLeft: widthToDp(4),
      paddingRight: widthToDp(6),
    },
    dateText: {
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(20),
      color: colors.darkGray,
    },
    contentHeaderText: {
      fontFamily: GlobalFonts.regular,
      fontSize: responsiveFontSize(20),
      color: colors.darkPrimary,
      marginTop: -4,
    },
    contentext: {
      fontFamily: GlobalFonts.regular,
      fontSize: responsiveFontSize(16),
      color: colors.darkPrimary,
    },
  });
export default makeStyles;
