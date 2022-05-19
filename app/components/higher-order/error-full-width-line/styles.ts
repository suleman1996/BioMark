import { StyleSheet } from 'react-native';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: widthToDp(100),
      backgroundColor: colors.red,
      padding: widthToDp(1.5),
      justifyContent: 'center',
      position: 'absolute',
      bottom: 100,
    },
    text: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.medium,
      color: colors.white,
      paddingLeft: widthToDp(4),
    },
  });
export default makeStyles;
