import { StyleSheet } from 'react-native';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: widthToDp(4),
      width: widthToDp(86),
      paddingVertical: heightToDp(2.5),
      backgroundColor: colors.lightPrimary,
      marginVertical: heightToDp(0.3),
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
      fontFamily: GlobalFonts.bold,
      lineHeight: heightToDp(3),
      fontSize: responsiveFontSize(20),
      color: colors.darkPrimary,
      marginTop: -4,
    },
    contentext: {
      fontFamily: GlobalFonts.bold,
      fontSize: responsiveFontSize(15),
      color: colors.darkPrimary,
    },
  });
export default makeStyles;
