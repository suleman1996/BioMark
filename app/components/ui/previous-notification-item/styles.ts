import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { StyleSheet } from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      width: widthToDp(86),
      paddingTop: heightToDp(1),
    },
    iconContainer: {
      width: widthToDp(5),
      paddingTop: heightToDp(1.8),
    },
    contentContainer: {
      width: widthToDp(70),
      paddingLeft: widthToDp(4),
      paddingRight: widthToDp(6),
    },
    dateText: {
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(15),
      color: colors.darkGray,
    },
    contentHeaderText: {
      fontFamily: GlobalFonts.regular,
      fontSize: responsiveFontSize(20),
      color: colors.darkPrimary,
    },
    contentext: {
      fontFamily: GlobalFonts.regular,
      fontSize: responsiveFontSize(15),
      color: colors.darkPrimary,
    },
    descriptionDataContainer: {
      width: widthToDp(83),
      paddingLeft: widthToDp(8.5),
    },
  });
export default makeStyles;
