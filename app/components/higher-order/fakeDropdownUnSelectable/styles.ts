import { StyleSheet } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: widthToDp(88),
      backgroundColor: colors.inputBg,
      height: heightToDp(6),
      borderRadius: widthToDp(2.5),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: widthToDp(2.5),
    },
    text: {
      fontSize: responsiveFontSize(18),
      fontFamily: GlobalFonts.medium,
      color: colors.black,
      paddingLeft: widthToDp(2.5),
    },
  });
export default makeStyles;
