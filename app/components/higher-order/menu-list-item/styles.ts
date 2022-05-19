import { StyleSheet } from 'react-native';

import { widthToDp } from 'utils/functions/responsive-dimensions';
import { GlobalFonts } from 'utils/theme/fonts';
import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: widthToDp(92),
      flexDirection: 'row',
      alignItems: 'center',
      padding: widthToDp(2),
      borderWidth: 1,
      paddingLeft: widthToDp(4),
      justifyContent: 'space-between',
    },
    text: {
      color: colors.darkPrimary,
      fontFamily: GlobalFonts.light,
      fontSize: responsiveFontSize(20),
      paddingLeft: widthToDp(3),
    },
  });
export default makeStyles;
