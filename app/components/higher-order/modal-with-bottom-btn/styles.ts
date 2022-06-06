import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      width: widthToDp(90),
      height: heightToDp(90),
      backgroundColor: colors.white,
      borderRadius: widthToDp(3),
    },
    title: {
      fontSize: responsiveFontSize(25),
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.bold,
      paddingHorizontal: widthToDp(4),
      paddingTop: heightToDp(2),
      marginBottom: heightToDp(3),
    },
  });
export default makeStyles;
